# Der Prozess

## Ein laufendes Programm

Wird ausgeführt, indem der Parent-Prozess das File (in dem maschinenlesbarer Code enthalten ist) `fork()'ed` oder `exec()'d`. Der Parent `wait()'ed`auf das Child, wenn es ihn interessiert.

Shell: Starten im Hintergrund mit `&` Holen in den Vordergrund mit fg, in den Hintergrund mit bg und nachschauen mit jobs

pid: Process ID
ppid: Parent Porcess ID

Signale: werden an Prozesse gesendet. Mit dem Befehl `kill`