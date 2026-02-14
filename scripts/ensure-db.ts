import { execSync } from "node:child_process";

function run(cmd: string) {
  execSync(cmd, { stdio: "inherit", env: process.env });
}

run("npx prisma generate");
run("npx prisma db push");
