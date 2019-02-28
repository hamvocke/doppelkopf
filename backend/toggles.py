from dataclasses import dataclass
from enum import Enum

feature_toggles = {}


def add(feature_toggle):
    if feature_toggle.name in feature_toggles:
        raise RuntimeError(
            'feature with name "{}" already registered'.format(feature_toggle.name)
        )
    feature_toggles.update({feature_toggle.name: feature_toggle})


def find(name):
    return feature_toggles.get(name)


@dataclass
class FeatureToggle(object):
    name: str
    enabled: bool = False

    def toggle(self):
        self.enabled = not self.enabled
