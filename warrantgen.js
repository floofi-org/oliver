if (process.argv.length < 6) {
    console.log("Usage: " + process.argv[0] + " " + process.argv[1] + " <news headline 1> <news headline 2> <news headline 3>");
    process.exit();
}

let full = `
Floofi Systems Warrant Canary
Version 2

Existing and proposed laws provide for secret warrants, searches and seizures of data, such as library records.
Some such laws provide for criminal penalties for revealing the warrant, search or seizure, disallowing the disclosure
of events that would materially affect the users of a platform such as Floofi Systems.  Floofi Systems and its
principals and members will in fact comply with such warrants and their provisions for secrecy.  Floofi Systems will
also make available, weekly, a "warrant canary" in the form of a cryptographically signed message containing the
following:

- a declaration that, up to that point, no warrants have been served, nor have any searches or seizures taken place
- a cut-and-paste headline from a major news source, establishing date

Special note should be taken if these messages ever cease being updated, or are removed from this page.

${new Date().toISOString().split("T")[0]}

No warrants have ever been served to Floofi Systems, or Floofi Systems principals or members.
No searches or seizures of any kind have ever been performed on any Floofi Systems assets.

( from https://www.reuters.com )

$$1
$$2
$$3

${new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' })}

-- To verify the authenticity of this message: --

1. Download a public key from one of these sources:
    <https://floo.fi/ssh.txt>
    <https://blog.floo.fi/changes/2024-12-05-ditching-gpg-in-favor-of-openssh>
    <https://gitlab.com/-/snippets/4777932/raw/main/ssh.txt>
    <https://gist.githubusercontent.com/starscouts/2e74daa659e45c369779e444e971dae7/raw/f138e8d9c94e1f6babad6bb18788cd9ee651242a/ssh.txt>
    
2. Download
   - the signature for this message at <https://floo.fi/warrant.sig> and
   - this message itself at <https://floo.fi/warrant.txt>.
   
3. On a UNIX system, execute the following command to verify the signature:
   $ cat warrant.txt | ssh-keygen -Y check-novalidate -n warrant-canary -f ssh.txt -s warrant.sig
   
3. On a Windows system, execute the following command to verify the signature:
   > type warrant.txt | ssh-keygen -Y check-novalidate -n warrant-canary -f ssh.txt -s warrant.sig
   
4. If you see:
   Good "warrant-canary" signature with ED25519 key SHA256:ydtcVI10dm7GApVpzWd0InuuXFsxCYUH1lhdDe2YY4Y
   the signature is valid.

-- Notes: --

This scheme is not infallible.  Although signing the declaration makes it impossible for a third party to produce
arbitrary declarations, it does not prevent them from using force to coerce Floofi Systems to produce false
declarations.  The news clip in the signed message serves to demonstrate that that update could not have been created
prior to that date.  It shows that a series of these updates were not created in advance and posted on this page.
`;

if (require('fs').existsSync("warrant.txt")) require('fs').unlinkSync("warrant.txt");

require('fs').writeFileSync("warrant.txt", full.replace("$$1", process.argv[2]).replace("$$2", process.argv[3]).replace("$$3", process.argv[4]));
require('child_process').execSync("cat warrant.txt | ssh-keygen -Y sign -n warrant-canary -f ~/.ssh/id_sign > warrant.sig");
require('fs').writeFileSync("ssh.txt", "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIVFhPFF3NQQE3aZTl0GymR7SL+63JuGc8yFaPJqgx1+ me@floo.fi")
require('child_process').execSync("node build.js", { stdio: "inherit" });
