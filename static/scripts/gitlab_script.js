const BASE_URL = "https://gitlab.com/api/v4/projects/";
const USERNAME = "oceanwall";
const REPO_NAME = "findadogforme";

const FIRST_NAMES = ["Samarth", "Matthew", "Bryan", "Keven", "Daniel"];
const LAST_NAMES = ["Desai", "Zhao", "Yang", "Chen", "Ho"];
const IDENTIFIERS = [["Samarth Desai", "37949934+SamarthDesai01@users.noreply.github.com", "samarthdesai01@gmail.com", "samarthdesai01"],
                     ["Matthew Zhao", "matthew.zhao@utexas.edu", "oceanwall"],
                     ["Bryan Yang", "bryanyang16", "bryany360@gmail.com"],
                     ["Keven Chen", "wc9245"],
                     ["Daniel Ho", "Triplestop", "danielho@cs.utexas.edu"]];

window.onload = async function() {
    let member_info = [];
    let member_map = new Map();

    for (let i = 0; i < 5; ++i) {
        member_info.push({"commits": 0,
                          "issues": 0,
                          "unit_tests": 0,
                          "first_name": FIRST_NAMES[i],
                          "last_name": LAST_NAMES[i]}
                      );
        for (let identifier of IDENTIFIERS[i])
            member_map.set(identifier, member_info[i]);
    }

    let total_commits = 0;
    let total_issues = 0;
    let total_unit_tests = 0;

    let repo_response = await fetch(`${BASE_URL}${USERNAME}%2F${REPO_NAME}`);
    let repo_info = await repo_response.json();

    /*
    ~~~~~~~~~~~~~~~~~
    COMMITS STATISTICS
    ~~~~~~~~~~~~~~~~~
    */

    let page_number = 1;
    let commits_response = await fetch(`${BASE_URL}${repo_info.id}/repository/commits?per_page=100&page=` + page_number);
    let commit_info = await commits_response.json();

    do {
        // TODO: GitLab API doesn't identify users by username but rather by author email
        for (let commit of commit_info) {
          if (member_map.has(commit.author_email)) {
              member_map.get(commit.author_email).commits++;
              total_commits++;
          }
          else if (member_map.has(commit.author_name)) {
              member_map.get(commit.author_name).commits++;
              total_commits++;
          }
          else {
            console.log("Unknown commiter: " + commit.author_name);
          }
        }

        ++page_number;
        commits_response = await fetch(`${BASE_URL}${repo_info.id}/repository/commits?per_page=100&page=` + page_number);
        commit_info = await commits_response.json();
    } while (commit_info.length > 0);

    /*
    ~~~~~~~~~~~~~~~~~
    ISSUES STATISTICS
    ~~~~~~~~~~~~~~~~~
    */

    // TODO: Pagination
    let issues_response = await fetch(`${BASE_URL}${repo_info.id}/issues`);
    let issue_info = await issues_response.json();

    for (let issue of issue_info) {
        if (member_map.has(issue.author.username)) {
          member_map.get(issue.author.username).issues++;
          total_issues++;
        }
        else {
          console.log("Unknown issue author: " + issue.author.username);
        }
    }

    /*
    ~~~~~~~~~~~~~~~~~~~~
    UNIT TESTS STATISTICS
    ~~~~~~~~~~~~~~~~~~~~
    */

    // TODO - Possibly entered manually?


    /*
    ~~~~~~~~~~~~~~~~~~~~~~
    DIRECT DOM MODIFICATION
    ~~~~~~~~~~~~~~~~~~~~~~
    */

    console.log(member_info);

    for (let member of member_info) {
      document.getElementById(`${member["first_name"]}-Commits`).innerHTML = member.commits;
      document.getElementById(`${member["first_name"]}-Issues`).innerHTML = member.issues;
      document.getElementById(`${member["first_name"]}-UT`).innerHTML = member.unit_tests;
    }

    document.getElementById("Total-Commits").innerHTML = total_commits;
    document.getElementById("Total-Issues").innerHTML = total_issues;
    document.getElementById("Total-UT").innerHTML = total_unit_tests;
}
