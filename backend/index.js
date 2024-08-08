const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pullRepo } = require("./controllers/pull");
const { pushRepo } = require("./controllers/push");
const { revertRepo } = require("./controllers/revert");

yargs(hideBin(process.argv))
  .command("init", "Initialize a new git repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to staging area",
        type: "string",
      });
    },
    addRepo
  )
  .command(
    "commit <message>",
    "Commit staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    commitRepo
  )
  .command("pull", "Pull commits", {}, pullRepo)
  .command("push", "push commits", {}, pushRepo)
  .command(
    "revert <commandID",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commandID", {
        describe: "ID of the commit to revert to",
        type: "string",
      });
    },
    revertRepo
  )
  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;
