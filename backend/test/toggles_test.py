from backend import toggles


sample_feature = toggles.Feature("sample feature", enabled=True)


def test_building_feature():
    assert sample_feature.enabled is True


def test_switch_feature_state():
    sample_feature.toggle()
    assert sample_feature.enabled is False

    sample_feature.toggle()
    assert sample_feature.enabled is True


def test_find_toggle():
    toggles.features.add(sample_feature)

    received_feature = toggles.features.find(name="sample feature")

    assert received_feature == sample_feature
