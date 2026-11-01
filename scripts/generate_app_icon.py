"""Generate the Tauri application icon (1024x1024 PNG) without external
dependencies. The generated PNG is converted to every platform icon set via
`npx tauri icons src-tauri/app-icon.png`.

Usage:  python scripts/generate_app_icon.py [output-path]
"""

from __future__ import annotations

import struct
import sys
import zlib
from pathlib import Path

SIZE = 1024


def _chunk(chunk_type: bytes, payload: bytes) -> bytes:
    return (
        struct.pack(">I", len(payload))
        + chunk_type
        + payload
        + struct.pack(">I", zlib.crc32(chunk_type + payload) & 0xFFFFFFFF)
    )


def _gradient_pixel(x: int, y: int) -> tuple[int, int, int, int]:
    """Deep-blue to teal diagonal gradient with a lighter rounded-square accent."""
    t = (x + y) / (2 * (SIZE - 1))
    r = int(30 + (45 - 30) * t)
    g = int(64 + (212 - 64) * t)
    b = int(95 + (250 - 95) * t)

    # Inset rounded square highlight (soft white overlay).
    inset = SIZE // 5
    if inset <= x < SIZE - inset and inset <= y < SIZE - inset:
        r, g, b = min(r + 90, 255), min(g + 90, 255), min(b + 85, 255)
    return r, g, b, 255


def generate_icon(output: Path) -> Path:
    rows: list[bytes] = []
    for y in range(SIZE):
        row = bytearray([0])  # PNG filter type 0 (None) per scanline
        for x in range(SIZE):
            row.extend(_gradient_pixel(x, y))
        rows.append(bytes(row))
    raw = b"".join(rows)

    ihdr = struct.pack(">IIBBBBB", SIZE, SIZE, 8, 6, 0, 0, 0)  # 8-bit RGBA
    png = (
        b"\x89PNG\r\n\x1a\n"
        + _chunk(b"IHDR", ihdr)
        + _chunk(b"IDAT", zlib.compress(raw, 9))
        + _chunk(b"IEND", b"")
    )
    output.write_bytes(png)
    return output


def main() -> None:
    output = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("src-tauri/app-icon.png")
    output.parent.mkdir(parents=True, exist_ok=True)
    generated = generate_icon(output)
    print(f"Icon generated: {generated}")


if __name__ == "__main__":
    main()
