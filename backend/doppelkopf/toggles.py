from dataclasses import dataclass
from enum import Enum
from . import db
import copy


def load():
    toggles_from_db = db.get_db().execute("SELECT * FROM toggle;").fetchall()


def add(feature_toggle):
    if feature_toggle.name in feature_toggles:
        raise RuntimeError(
            'feature with name "{}" already registered'.format(feature_toggle.name)
        )
    feature_toggles.update({feature_toggle.name: feature_toggle})


def find(name):
    return feature_toggles.get(name)


def merge(persisted_toggles, runtime_toggles):
    merged_toggles = copy.deepcopy(runtime_toggles)
    for key in runtime_toggles:
        if key in persisted_toggles:
            merged_toggles[key] = persisted_toggles[key]
    return merged_toggles


@dataclass
class FeatureToggle(object):
    name: str
    enabled: bool = False

    def toggle(self):
        self.enabled = not self.enabled


feature_toggles = {}
