---
title: Gradle
---

Docs: https://docs.gradle.org/current/userguide/userguide.html

DSL reference: https://docs.gradle.org/current/dsl/index.html

CLI: https://docs.gradle.org/current/userguide/command_line_interface.html

Basic help: `./gradlew help`

CLI options/help: `./gradlew --help`

## Wrapper

Upgrade the wrapper: `./gradlew wrapper --gradle-version=6.7.1`

This updates gradlew, gradlew.bat, gradle/wrapper/gradle-wrapper.jar and gradle/wrapper/gradle-wrapper.properties.

After upgrading `./gradlew --version` should show the new version.

## Tasks

List tasks: `./gradlew tasks` or `./gradlew Task :help`. Note that this does not list all the tasks. To see 'Other tasks' run `./gradlew tasks --all`.

Run task: `./gradlew <task>`. To see what it would do if run do `./gradlew <task> --dry-run`, which shows the tasks dependencies that would be executed.

Task help: `./gradlew help --task <task>`

## Clean

`./gradlew clean`

`./gradlew cleanBuildCache` - [Doesn't work on Android](https://stackoverflow.com/a/43245885/4034572)

Clear Gradle global cache (when clean and 'Invalidate Caches / Restart' don't work):

```shell
ls ~/.gradle/caches/
rm -rf ~/.gradle/caches/build-cache-*
```

Clear local .gradle folders:

```shell
find . -type d -name ".gradle"
find . -type d -name ".gradle" -exec rm -rf {} +
```

### Deep clean

https://github.com/rock3r/deep-clean

```shell
find . -type d -name "build"
find . -type d -name "build" -exec rm -rf {} +

find . -type f -name "*.iml"
find . -type f -name "*.iml" -exec rm -rf {} +

find . -type d -name ".idea"
find . -type d -name ".idea" -exec rm -rf {} +
```

## Performance

https://docs.gradle.org/nightly/userguide/performance.html

## Profile

About `--profile` on the [docs](https://docs.gradle.org/current/userguide/command_line_interface.html#sec:command_line_performance):

> Generates a high-level performance report in the `$buildDir/reports/profile` directory. `--scan` is preferred.

You can do `./gradlew --profile` or `./gradlew clean build --profile`. On Android you can do `./gradlew assembleDebug --profile`.

Examples:

```shell
./gradlew --profile --offline --rerun-tasks assembleDebug
./gradlew --profile --offline --rerun-tasks --max-workers=4 assembleDebug
```

### gradle-profiler

https://github.com/gradle/gradle-profiler

Example of how to use it: https://adambennett.dev/2020/08/disabling-jetifier

## Daemon

https://docs.gradle.org/current/userguide/gradle_daemon.html

Enabled by default since 3.X. Always enable the daemon since it makes builds start faster (JVM startup time is bad). To do so add `org.gradle.daemon=true` to `gradle.properties`.

> Gradle will kill any Daemon that has been idle for 3 hours or more, so you don’t have to worry about cleaning them up manually.

List daemons: `./gradlew --status`

Alternatively, you can also view the Gradle daemons by printing out all the java processes on the system and the process id ([source](https://runningcode.github.io/gradle-doctor/java-home/#view-all-gradle-daemons)): `jps`

Kill daemons: `./gradlew --stop`

Note that this kills daemons for the with the current Gradle version ([source](https://runningcode.github.io/gradle-doctor/java-home/#killing-gradle-daemons)). To kill all daemons regardless of version do `pkill -f '.*GradleDaemon.*'`.

https://docs.gradle.org/current/userguide/gradle_daemon.html#sec:how_can_i_stop_a_daemon

> Daemon processes will automatically terminate themselves after 3 hours of inactivity or less. If you wish to stop a Daemon process before this, you can either kill the process via your operating system or run the `gradle --stop` command. The `--stop` switch causes Gradle to request that all running Daemon processes, _of the same Gradle version used to run the command_, terminate themselves.
