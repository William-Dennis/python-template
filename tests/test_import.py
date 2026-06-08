from __future__ import annotations

import logging

import pytest

from python_template import main


def test_main_callable() -> None:
    assert callable(main)


def test_main_logs(caplog: pytest.LogCaptureFixture) -> None:
    with caplog.at_level(logging.INFO, logger="python_template"):
        main()
    assert "Hello from python-template!" in caplog.text
