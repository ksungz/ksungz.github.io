#!/usr/bin/env python3
"""YouTube 자막을 최대 6,000자까지 출력한다."""

import sys

try:
    from youtube_transcript_api import YouTubeTranscriptApi

    api = YouTubeTranscriptApi()
    transcript = api.fetch(video_id=sys.argv[1], languages=["ko", "en"])
    print(" ".join(entry.text for entry in transcript)[:6000])
except Exception:
    print("")
