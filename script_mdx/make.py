"""
From the main directory:
python script_mdx/make.py trouble-brewing
"""
import argparse
import enum
import json
from dataclasses import dataclass
from itertools import groupby
from operator import attrgetter
from pathlib import Path

from jinja2 import Template


class CharacterType(enum.StrEnum):
    TOWNSFOLK = "townsfolk"
    OUTSIDER = "outsider"
    MINION = "minion"
    DEMON = "demon"
    TRAVELLERS = "travellers"

    @property
    def display_name(self):
        match self:
            case CharacterType.TOWNSFOLK:
                return "Townsfolk"
            case CharacterType.OUTSIDER:
                return "Outsiders"
            case CharacterType.MINION:
                return "Minions"
            case CharacterType.DEMON:
                return "Demons"
            case CharacterType.TRAVELLERS:
                return "Travellers"


@dataclass
class Character:
    internal_name: str
    name: str
    ability: str
    type: CharacterType
    extra_mdx: str | None


def read_characters(name: str) -> list[Character]:
    for character_file in (Path(__file__).parent / "characters").glob("*.json"):
        data = json.loads(character_file.read_text())
        try:
            extra_mdx = character_file.with_suffix(".mdx").read_text()
        except FileNotFoundError:
            extra_mdx = None
        yield Character(
            internal_name=character_file.name.removesuffix(".json"),
            name=data["name"],
            ability=data["ability"],
            type=CharacterType(data["type"]),
            extra_mdx=extra_mdx,
        )


def make_script_mdx(name: str, target: Path) -> None:
    script_base = Path(__file__).parent / "scripts" / name
    script = json.loads((script_base / "script.json").read_text())
    available_characters = {character.internal_name: character for character in read_characters(name)}
    metadata = script.pop(0)
    if not isinstance(metadata, dict):
        raise ValueError("Script JSON must contain metadata.")
    try:
        intro = (script_base / "intro.mdx").read_text()
    except FileNotFoundError:
        intro = None
    
    selected_characters = [available_characters[name] for name in script]
    template = Template((Path(__file__).parent / "template.mdx").read_text())
    output = template.render({
        "name": name,
        "script_name": metadata["name"],
        "intro": intro,
        "characters_by_type": groupby(selected_characters, key=attrgetter("type"))
    })
    (target / name).with_suffix(".mdx").write_text(output)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('name')
    args = parser.parse_args()

    if (path := Path("src/content/scripts")).exists():
        make_script_mdx(args.name, target=path)


if __name__ == "__main__":
    main()
