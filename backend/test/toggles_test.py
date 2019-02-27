from backend import toggles


def test_send_metrics():
    sample_toggle = toggles.FeatureToggle("sample toggle", enabled=True)

    assert sample_toggle.enabled is True
