# Emacs Extension for VS Code
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/SeungukShin/emacs-code/CI)
[![](https://img.shields.io/visual-studio-marketplace/v/SeungukShin.emacs-code)](https://marketplace.visualstudio.com/items?itemName=SeungukShin.emacs-code)
![install](https://img.shields.io/visual-studio-marketplace/i/SeungukShin.emacs-code)

[Emacs](https://www.gnu.org/software/emacs/) key bindings into VS Code.

![demo](https://raw.githubusercontent.com/SeungukShin/emacs-code/master/demo.gif)

## Keybindings
### Changing the Location of Point
| Key           | Description                                                          | Command                     |
|---------------|----------------------------------------------------------------------|-----------------------------|
| `ctrl+p`      | Move up one line                                                     | `cursorUp`                  |
| `ctrl+n`      | Move down one line                                                   | `cursorDown`                |
| `ctrl+b`      | Move backward one character                                          | `cursorLeft`                |
| `ctrl+f`      | Move forward one character                                           | `cursorRight`               |
| `alt+b`       | Move backward one word                                               | `cursorWordLeft`            |
| `alt+f`       | Move forward one word                                                | `cursorWordRight`           |
| `ctrl+a`      | Move to the beinning of the line                                     | `cursorHome`                |
| `ctrl+e`      | Move to the end of the line                                          | `cursorEnd`                 |
| `alt+v`       | Move one screen backward                                             | `cursorPageUp`              |
| `ctrl+v`      | Move one screen forward                                              | `cursorPageDown`            |
| `alt+shift+,` | Move to the top of the buffer                                        | `cursorTop`                 |
| `alt+shift+.` | Move to the end of the buffer                                        | `cursorBottom`              |
| `alt+g g`     | Read a number *n* and move point to the beginning of line number *n* | `workbench.action.gotoLine` |

### Killing and Yanking Text
| Key      | Description                        | Command                              |
|----------|------------------------------------|--------------------------------------|
| `ctrl+d` | Delete the character after point   | `deleteRight`                        |
| `ctrl+k` | Kill to the end of the line        | `emacs-code.kill.line`               |
| `ctrl+w` | Kill the region                    | `emacs-code.kill`                    |
| `alt+w`  | Copy the region into the kill ring | `emacs-code.copy`                    |
| `ctrl+y` | Yank pop                           | `editor.action.clipboardPasteAction` |

### Files
| Key             | Description | Command                       |
|-----------------|-------------|-------------------------------|
| `ctrl+x ctrl+f` | Find file   | `emacs-code.find.file`        |
| `ctrl+x ctrl+s` | Save buffer | `workbench.action.files.save` |

### Setting the Mark
| Key          | Description                            | Command                       |
|--------------|----------------------------------------|-------------------------------|
| `ctrl+space` | Set the mark at point, and activate it | `emacs-code.toggle.mode.line` |

### Rectangles
| Key          | Description                | Command                         |
|--------------|----------------------------|---------------------------------|
| `ctrl+enter` | Toggle Rectangle Mark mode | `emacs-code.toggle.mode.column` |

### Clearing Mode
| Key      | Description                 | Command                 |
|----------|-----------------------------|-------------------------|
| `escape` | Clear mark or retangle mode | `emacs-code.clear.mode` |

### Searching
| Key      | Description         | Command        |
|----------|---------------------|----------------|
| `ctrl+s` | Activate find input | `actions.find` |
| `ctrl+s` | Find next match     | `actions.find` |
| `ctrl+r` | Activate find input | `actions.find` |
| `ctrl+r` | Find previous match | `actions.find` |

### Creating and Selecting Buffers
| Key        | Description     | Command                                                       |
|------------|-----------------|---------------------------------------------------------------|
| `ctrl+x b` | Select a buffer | `workbench.action.quickOpenPreviousRecentlyUsedEditorInGroup` |

### Killing Buffers
| Key        | Description | Command                              |
|------------|-------------|--------------------------------------|
| `ctrl+x k` | Kill buffer | `workbench.action.closeActiveEditor` |

### Comment Commands
| Key        | Description                           | Command                     |
|------------|---------------------------------------|-----------------------------|
| `ctrl+x ;` | Comment or uncomment the current line | `editor.action.commentLine` |

### Running Commands by Name
| Key     | Description   | Command                         |
|---------|---------------|---------------------------------|
| `alt+x` | Run a command | `workbench.action.showCommands` |

### Exiting
| Key             | Description | Command                 |
|-----------------|-------------|-------------------------|
| `ctrl+x ctrl+c` | Kill Code   | `workbench.action.quit` |

## Configurations