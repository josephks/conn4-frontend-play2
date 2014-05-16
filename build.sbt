name := """conn4-frontend-play2"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.0"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  ws
)

libraryDependencies ++= Seq(
  "org.webjars" % "webjars-play_2.10" % "2.3.0-RC1",
  //2.11.0 jar not published yet: "org.webjars" %% "webjars-play" % "2.3.0-RC1",
   "org.webjars" % "jquery" % "2.1.1"
)

