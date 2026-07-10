interface GitHubRepositoryConfig {
  owner: string;
  repo: string;
  baseBranch: string;
  token: string;
}

interface GitHubApiErrorBody {
  message?: string;
}

interface GitHubRefResponse {
  object: { sha: string };
}

interface GitHubPullResponse {
  html_url: string;
}

export interface CreateDraftPullRequestInput {
  date: string;
  title: string;
  content: string;
  sourceUrl: string;
}

export interface DraftPullRequestResult {
  branchName: string;
  fileName: string;
  mdxPath: string;
  prUrl: string;
}

class GitHubApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
  }
}

function repositoryConfig(): GitHubRepositoryConfig | null {
  const token = process.env.GITHUB_TOKEN?.trim() || "";
  const repository = process.env.GITHUB_REPOSITORY?.trim() || "ksungz/ksungz.github.io";
  const [owner, repo] = repository.split("/");

  if (!token || !owner || !repo) return null;
  return {
    owner,
    repo,
    baseBranch: process.env.GITHUB_BASE_BRANCH?.trim() || "main",
    token,
  };
}

export function isGitHubDraftConfigured(): boolean {
  return repositoryConfig() !== null;
}

function refPath(branchName: string): string {
  return branchName.split("/").map(encodeURIComponent).join("/");
}

async function githubRequest<T>(
  config: GitHubRepositoryConfig,
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        ...init.headers,
      },
      signal: init.signal || AbortSignal.timeout(30_000),
    }
  );

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as GitHubApiErrorBody | null;
    throw new GitHubApiError(
      response.status,
      body?.message || `GitHub API returned ${response.status}`
    );
  }

  return (await response.json()) as T;
}

async function githubResourceExists(
  config: GitHubRepositoryConfig,
  path: string
): Promise<boolean> {
  try {
    await githubRequest(config, path);
    return true;
  } catch (error) {
    if (error instanceof GitHubApiError && error.status === 404) return false;
    throw error;
  }
}

async function deleteBranch(
  config: GitHubRepositoryConfig,
  branchName: string
): Promise<void> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${config.owner}/${config.repo}/git/refs/heads/${refPath(branchName)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${config.token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        signal: AbortSignal.timeout(15_000),
      }
    );
    if (!response.ok && response.status !== 404) {
      console.error("[feed/blog-draft] failed to clean up branch", response.status);
    }
  } catch {
    console.error("[feed/blog-draft] failed to clean up branch");
  }
}

export async function createDraftPullRequest(
  input: CreateDraftPullRequestInput
): Promise<DraftPullRequestResult> {
  const config = repositoryConfig();
  if (!config) throw new Error("GitHub publishing is not configured");

  const baseRef = await githubRequest<GitHubRefResponse>(
    config,
    `/git/ref/heads/${refPath(config.baseBranch)}`
  );

  let branchName = "";
  let fileName = "";

  for (let index = 1; index <= 99; index += 1) {
    const suffix = index === 1 ? "" : `-${index}`;
    const candidateBranch = `draft/geek-digest-${input.date}${suffix}`;
    const candidateFile = `geek-digest-${input.date}${suffix}.mdx`;
    const candidatePath = `src/content/tech/${candidateFile}`;

    const [branchExists, fileExists] = await Promise.all([
      githubResourceExists(
        config,
        `/git/ref/heads/${refPath(candidateBranch)}`
      ),
      githubResourceExists(
        config,
        `/contents/${candidatePath}?ref=${encodeURIComponent(config.baseBranch)}`
      ),
    ]);

    if (!branchExists && !fileExists) {
      branchName = candidateBranch;
      fileName = candidateFile;
      break;
    }
  }

  if (!branchName || !fileName) {
    throw new Error("No available draft branch name was found");
  }

  const mdxPath = `src/content/tech/${fileName}`;
  await githubRequest(config, "/git/refs", {
    method: "POST",
    body: JSON.stringify({
      ref: `refs/heads/${branchName}`,
      sha: baseRef.object.sha,
    }),
  });

  try {
    await githubRequest(config, `/contents/${mdxPath}`, {
      method: "PUT",
      body: JSON.stringify({
        message: `feat: geek-digest ${input.date}`,
        content: Buffer.from(input.content, "utf8").toString("base64"),
        branch: branchName,
      }),
    });

    const pullRequest = await githubRequest<GitHubPullResponse>(config, "/pulls", {
      method: "POST",
      body: JSON.stringify({
        title: input.title.slice(0, 120),
        head: branchName,
        base: config.baseBranch,
        draft: true,
        body: [
          "AI 분석을 바탕으로 생성한 GeekNews Digest 초안입니다.",
          "",
          `원문: ${input.sourceUrl}`,
          "",
          "사실관계와 문체를 검토한 뒤 병합합니다.",
        ].join("\n"),
      }),
    });

    return {
      branchName,
      fileName,
      mdxPath,
      prUrl: pullRequest.html_url,
    };
  } catch (error) {
    await deleteBranch(config, branchName);
    throw error;
  }
}
