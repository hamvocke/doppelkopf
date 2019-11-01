from doppelkopf import create_app


def test_config():
    assert create_app({"FOO": True}).config.get("FOO") is True
