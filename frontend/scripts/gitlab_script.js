const BASE_URL = "https://gitlab.com/api/v4/projects/";
const USERNAME = "oceanwall";
const REPO_NAME = "findadogforme";

const FIRST_NAMES = ["Samarth", "Matthew", "Bryan", "Keven", "Daniel"];
const LAST_NAMES = ["Desai", "Zhao", "Yang", "Chen", "Ho"];
const IDENTIFIERS = [["37949934+SamarthDesai01@users.noreply.github.com", "samarthdesai01"],
                     ["matthew.zhao@utexas.edu", "oceanwall"],
                     ["bryanyang16"],
                     ["wc9245"],
                     ["Triplestop"],];

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

    // TODO: Pagination
    let commits_response = await fetch(`${BASE_URL}${repo_info.id}/repository/commits`);
    let commit_info = await commits_response.json();

    // TODO: GitLab API doesn't identify users by username but rather by author email
    for (let commit of commit_info) {
        member_map.get(commit.author_email).commits++;
        total_commits++;
    }

    /*
    ~~~~~~~~~~~~~~~~~
    ISSUES STATISTICS
    ~~~~~~~~~~~~~~~~~
    */

    // TODO: Pagination
    let issues_response = await fetch(`${BASE_URL}${repo_info.id}/issues`);
    let issue_info = await issues_response.json();

    for (let issue of issue_info) {
        member_map.get(issue.author.username).issues++;
        total_issues++;
    }

    /*
    ~~~~~~~~~~~~~~~~~~~~
    UNIT TESTS STATISTICS
    ~~~~~~~~~~~~~~~~~~~~
    */

    // TODO


    /*
    ~~~~~~~~~~~~~~~~~~~~~~
    DIRECT DOM MODIFICATION
    ~~~~~~~~~~~~~~~~~~~~~~
    */

    console.log(member_info);
}
