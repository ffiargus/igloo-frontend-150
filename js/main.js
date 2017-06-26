// Your code here ...

var options = {
    headers: {
      Accept: 'application/json'
    },
    method: 'get',
    queryparams: {
      results: 5
    },
    apibaseurl: 'https://randomuser.me',
    apipath: '/api'
  }

var client = new ApiGetClient(options);

var loadCount = 0;

function createMemberElement(memberInfo) {
  let member = $("<div>").addClass("member");
  let name = memberInfo.name.first + " " + memberInfo.name.last;

  member.append(
    $("<img>").attr("src", memberInfo.picture.large),
    $("<h3>").text(name),
    $("<p>").text(memberInfo.email))


  return member;

}

function renderMembers(members) {
  let $memberRow = $("<div>").addClass("member-row");

  for (member of members.results) {
    let $member = createMemberElement(member);
    $memberRow.append($member);
  }
    $(".member-container").append($memberRow);
}

$(function() {

  function getMembers () {
    $.ajax({
      url: client.getRequestUrl(),
      success: function (data) {
        console.log('getting members')
        renderMembers(data);
      },
      failure: function () {
        console.error('loading members failed');
      }
    })

  }

  getMembers();

  $("#js-btn-action-more").on("click", function(event) {
    loadCount++;
    getMembers();
    event.preventDefault();

    if (loadCount > 5) {
      $("#js-btn-action-more").remove();
    }

  })

})