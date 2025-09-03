/* 
    This file contains local-stored local accounts,
    with each account assigned to a different role, to
    test difference between logging into the website for 
    each role. 

    Don't need this file anymore!
*/
export function seedLocalAccounts() {
    if (!localStorage.getItem("accounts")) {
      const users = [
        { username: "admin", password: "adminpass", name: "Alice Admin", role: "Admin", email: "alice@lhnt.com" },
        { username: "dev", password: "devpass", name: "David Developer", role: "Developer", email: "david@lhnt.com" },
        { username: "editor", password: "editpass", name: "Eve Editor", role: "Content Editor", email: "eve@lhnt.com" },
        { username: "member", password: "memberpass", name: "Mike Member", role: "Member", email: "mike@lhnt.com" }
      ];
      localStorage.setItem("accounts", JSON.stringify(users));
    }
}