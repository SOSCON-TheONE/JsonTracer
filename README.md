# ONE vscode extension

publisher : SSAFY TheONE



## Preview

![one-preview](README.assets/one-preview.gif)

- Click `Load`, a file selection dialog will pop up
- You can `visualize` JSON files.
- `Zoom-in/Zoom-out` is possible.
- `GPU/CPU` usage is displayed.
- You can click on the bar to see `More info`.
- You can `open/close`  the panel.
- Fixed left bar
- Capture
- Make the color a bit prettier



## To be developed

- Changed to responsive scale when zooming in/out ⏫
- Bar multi-selection (individual multi-selection, section dragging) ⏫
- Capture complete message pop-up 🔽



## Discussion

- Shall we change to dark mode?



## Run locally

Type `yarn` to create `node_modules`. Because the build file is also uploaded for convenience of use, `yarn watch-build` is not necessary. If the build file is deleted or there is a problem, run the command.

After that, you can run the `vscode extension` by pressing the `F5` key. Press `ctrl + shift + P` in the newly opened VScode and enter the command below to auto complete.

The following warning message may be output. Just press `Debug anyway` and proceed.

![image-20210907140731033](README.assets/image-20210907140731033.png)



### run

```
$ yarn
$ yarn watch-build
```



### command

```
ONE:one-vscode-barchart
```



### Library

| name              | git                                                    | license |
| ----------------- | ------------------------------------------------------ | ------- |
| html2canvas       | https://github.com/niklasvh/html2canvas                | MIT     |
| react             | https://github.com/facebook/react                      | MIT     |
| styled-components | https://github.com/styled-components/styled-components | MIT     |
| terser            | https://github.com/terser/terser                       | BSD     |
|                   |                                                        |         |

