if (process.argv.length < 6) {
    console.log("Usage: " + process.argv[0] + " " + process.argv[1] + " <news headline 1> <news headline 2> <news headline 3> <headlines date>");
    process.exit();
}

let full = `
Equestria.dev warrant canary

Existing and proposed laws provide for secret warrants, searches and seizures of data, such as library records.
Some such laws provide for criminal penalties for revealing the warrant, search or seizure, disallowing the disclosure
of events that would materially affect the users of a platform such as Equestria.dev.  Equestria.dev and its principals
and members will in fact comply with such warrants and their provisions for secrecy.  Equestria.dev will also make
available, weekly, a "warrant canary" in the form of a cryptographically signed message containing the following:

- a declaration that, up to that point, no warrants have been served, nor have any searches or seizures taken place
- a cut and paste headline from a major news source, establishing date

Special note should be taken if these messages ever cease being updated, or are removed from this page.

%%

https://floo.fi/publickey.txt | https://github.com/starscouts.gpg | https://gitlab.com/starscouts.gpg

Notes:

This scheme is not infallible.  Although signing the declaration makes it impossible for a third party to produce
arbitrary declarations, it does not prevent them from using force to coerce Equestria.dev to produce false
declarations.  The news clip in the signed message serves to demonstrate that that update could not have been created
prior to that date.  It shows that a series of these updates were not created in advance and posted on this page.
`;

let text = `
${new Date().toISOString().split("T")[0]}

No warrants have ever been served to Equestria.dev, or Equestria.dev principals or members.
No searches or seizures of any kind have ever been performed on any Equestria.dev assets.

( from https://www.reuters.com )

$$1
$$2
$$3

$$4

`.trimStart();

if (require('fs').existsSync("warrant.txt")) require('fs').unlinkSync("warrant.txt");
if (require('fs').existsSync("publickey.txt")) require('fs').unlinkSync("publickey.txt");

require('fs').writeFileSync("pre.txt", text.replace("$$1", process.argv[2]).replace("$$2", process.argv[3]).replace("$$3", process.argv[4]).replace("$$4", process.argv[5]));
require('child_process').execSync("gpg --clearsign -o warrant pre.txt");
require('child_process').execSync("gpg --export -a AEA773DB0620C57CFFB07A91EFBDC68435A574B7 > publickey.txt");
require('fs').writeFileSync("warrant.txt", full.replace("%%", require('fs').readFileSync("warrant").toString()));
require('fs').unlinkSync("pre.txt");
require('child_process').execSync("node build.js", { stdio: "inherit" });
