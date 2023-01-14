# Oni
Oni is a simple javascript revision control system based on git.

# Installation
```bash
npm install -g
```

# Usage

## Basic Usage

```bash
oni <command> [<args>]
```

## Commands

### Setup & Creation

```bash
oni init
```
Make an existing repository an Oni repository

```bash
oni clone [url]
```
Get an Oni repository from a provided URL

### Staging & Snapshots

```bash
oni status
```
List modified files that are staged for the next commit


```bash
oni add [file]
```
Add a file to be tracked in the repository

```bash
oni cat [file] [object]
```
Print out the contents of a given file

```bash
oni snapshot [message]
```
Commit staged changes as a new snapshot


### Branching & Merging

```bash
oni branch
```
List all branches

```bash
oni branch [branch-name]
```
Create a new branch from the current working branch at the current snapshot

```bash
oni merge [branch-name]
```
Merge the branch into the current working branch
