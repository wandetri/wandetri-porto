---
title: "From Board Game Frustration to an iOS App: Building Katase for Sekata Players"
slug: building-katase-ios-app-for-sekata
date: 2026-06-22
updated: 2026-06-22
description: "How a recurring Sekata board-game problem became Katase, an iOS companion built with SwiftUI, SQLite, SwiftData, and AI-assisted development."
cover: /blog/images/katase-sekata-ios-app.gif
coverAlt: "Animated Katase product overview with Sekata cards, app architecture, and iOS interface"
tags: [SwiftUI, SQLite, AI Agent]
author: "Wande Tricada"
featured: true
---

Between the busy activities at the Academy, my friends and I often play board games to take a break. One game we keep returning to is **Sekata**, a word game where players combine syllable cards and quickly say a valid Indonesian word.

The core rule is straightforward: the word must exist in KBBI. In practice, that rule exposes a bigger problem. Our Indonesian vocabulary is more limited than we expect.

We regularly stop to ask whether a word is slang, a regional expression, or a valid standard word. Because we come from different parts of Indonesia, words that feel completely normal to one player can be unfamiliar to everyone else. Sometimes the game appears to reach a dead end because nobody can see another possible combination.

My assumption was different: **the words probably still existed; we simply had not found them yet.**

That frustration became the starting point for Katase, an iOS companion designed to help Sekata players validate words, discover possible combinations, and learn more Indonesian vocabulary.

## Why existing search tools were not enough

I could not find a practical way to search for words using syllable fragments. A query such as “find words containing both `po` and `ka`” requires more than a standard dictionary lookup.

![Animated word splitting process for Sekata syllable combinations](/blog/images/katase-word-split.gif "Word splitting process")

KBBI search expects a complete word. General AI search adds extra steps and does not reliably return complete or verifiable data. What I needed was a system that understood both a dictionary and the physical constraints of the Sekata deck.

The first product scope therefore had two essential capabilities:

- Check whether a word is valid according to KBBI and Sekata rules.
- Search for valid words from a selected combination of syllable cards.

I later added session tracking so the app could also support an active Sekata game.

## Translating the board game into constraints

Before writing the app, I inventoried the physical cards and counted how often each one appeared. The deck contains:

- 102 pink cards representing 52 different syllables.
- 13 orange cards that act as general helper cards.
- 10 green cards that act as personal helper cards.

A valid Sekata word must satisfy every rule below:

1. The word exists in KBBI.
2. The word has a definition.
3. The word can be split into syllables available in the game.
4. Exactly two pink cards are used.
5. Orange cards are used at most three times and cannot repeat.
6. A green card is used at most once.

Writing these conditions down was important. They became a testable domain model instead of informal rules held in my head.

## Choosing SwiftUI, SwiftData, and SQLite

Data management was the area of iOS development I most needed to understand. Katase involved two very different kinds of data:

- A large, existing KBBI dataset that should be read efficiently.
- Small, user-generated records such as sessions, players, and previously used words.

I used **SQLite** for the bundled dictionary and **SwiftData** for mutable app data. This separation kept the large reference dataset read-only while allowing session data to use Swift-native models.

A simplified SwiftData model looks like this:

```swift
import SwiftData

@Model

final class GameSession {

    var title: String = ""
    var startingCenter: String = ""
    var currentCenter: String = ""
    var generalHelperLetters: String = ""

    @Relationship(deleteRule: .cascade, inverse: \GamePerson.gameSession)
    var people: [GamePerson]? = []
    @Relationship(deleteRule: .cascade, inverse: \PlayedWord.gameSession)

    var playedWords: [PlayedWord]? = []

}
```

SwiftData gave me an ORM-like workflow that felt familiar from web development: define the models, describe their relationships, and query them through the app without manually managing every database operation.

## Preparing 194,000 KBBI entries

I found an open-source repository containing approximately 194,000 Indonesian vocabulary entries in CSV format. The app needed that data in a format that could be bundled and searched locally, so I converted it into SQLite.

This was one place where an AI coding agent was useful. I delegated the repetitive conversion work to Codex: generating a Python import script, defining the SQLite schema, normalizing values, creating indexes, and verifying row counts.

The resulting table was intentionally simple:

```sql
CREATE TABLE words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lemma TEXT NOT NULL,
    normalized TEXT NOT NULL UNIQUE,
    definition TEXT DEFAULT '',
    word_class TEXT DEFAULT ''
);

```

This did not remove the need to understand the data. It reduced the mechanical work so I could spend more time checking assumptions, inspecting edge cases, and designing the product.

## Tokenizing words into Sekata cards

The harder problem was determining whether a word could be constructed from the available cards.

Consider a simplified word such as `POKASI`. Depending on the deck, the tokenizer may need to test combinations such as:

```text
PO + KA + SI
PO + K + A + SI
P + O + KA + SI
```

A greedy approach is unreliable because choosing the longest token first can prevent a valid combination later. I used backtracking so the tokenizer could explore possible splits and stop when it found a sequence that satisfied the card rules.

Each possible token sequence is then checked against card color, quantity, repetition, and helper-card limits. Applying those constraints reduced approximately **194,700 dictionary entries to 43,600 Sekata-valid words**.

That filtered dataset made in-app search much faster and gave the results a clear relationship to the real game.

## Where the AI agent helped

Codex was most useful for tasks with a clear specification and verifiable output:

- Converting CSV data into a normalized SQLite database.
- Generating validation scripts and database checks.
- Exploring tokenization strategies.
- Implementing card constraints as testable functions.
- Diagnosing Swift and data-layer errors during development.

The agent accelerated implementation, but product decisions still required direct judgment. I had to define the Sekata rules, inspect incorrect token combinations, decide what information mattered to players, and verify that generated code matched the intended behavior.

The useful division of labor was simple: let the agent handle repeatable implementation work, then spend human attention on constraints, validation, and experience design.

## Designing Katase around how people play

![Katase home screen showing Sesi Baru, Cek Kata, Cari Kata, and recent sessions](/blog/images/katase-home-screen.png "Katase home screen")

Katase currently centers on three features:

- **Sesi Baru** simulates a Sekata game and records players and used words.
- **Cek Kata** verifies whether a word exists and whether it is valid under Sekata rules.
- **Cari Kata** finds valid words from selected syllable combinations.

![Katase syllable selection screens for Sesi Baru and Cari Kata](/blog/images/katase-input-screen.png "Selecting Sekata syllables in Katase")

Whenever users select syllables, the app displays all available syllables on one screen. This mirrors how Sekata players spread cards across a table and visually scan the complete set instead of navigating through nested menus.

![Katase word search results and word validation screens](/blog/images/katase-search-result-screen.png "Katase search results and validation")

Each search result is presented as one compact card containing:

- Validation status.
- The searched word.
- Its word class, such as noun, adjective, or verb.
- The matching card combination and KBBI definition.

These choices make Katase feel connected to the board game rather than like a generic dictionary interface.

## What started as one question

Katase began as a small attempt to answer a recurring question during a game with friends:

> Were there really no words left, or had we simply not found them yet?

Building the app turned that frustration into a practical lesson about domain modeling, local data, search, tokenization, and AI-assisted development. More importantly, it created a tool that can help players continue the game while learning how much vocabulary is still left to discover.
