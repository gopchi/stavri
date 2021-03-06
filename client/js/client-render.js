// All these function render piece of HTML to plug into the DOM tree.
// The HTML can be plugged using $('#id').html(new_html);

function render_authors(authors) {
	var html = "<tr>"+
			"<th>ID</th>"+
			"<th>Name</th>"+
			"<th>Age</th>"+
			"<th>Country</th>"+
			"<th></th>"+
		"</tr>";

	for(var i=0; i<authors.length; i++) {
		var author = authors[i];
		html += "<tr>" +
			"<td>" + author.id + "</td>" +
			"<td><a href='#' data-person-id='" + author.id + "' class='user_icon person-telephones'>" +
				html_escape(author.A_name) +
			"</a></td>"+
			"<td>" + html_escape(author.age) + "</td>" +
			"<td>" + html_escape(author.name) + "</td>" +
			"<td>" +
				"<a href='#' data-person-id='" + author.id + "' class='edit_icon person-edit'>Edit</a> " +
				"<a href='#' data-person-id='" + author.id + "' class='delete_icon person-delete'>Delete</a>" +
			"</td>" +
		"</tr>";
	}

	html = "<table class='grid'>"+html+"</table>";
	return html;
}

function render_person_form(person) {
	if(!person) return 'Empty person.';

	var html = '';
	var title = (person.id) ? 'Edit Person' : 'Add Person';

	html += "<h1>" + title + "</h1>";
	html += "<form action='#' method='post'>";
	html += "<p><label>ID</label><input name='id' value='" + html_escape(person.id) + "' readonly='readonly' /></p>";
	html += "<p><label>First Name</label><input name='fname' value='" + html_escape(person.fname) + "'/></p>";
	html += "<p><label>Last Name</label><input name='lname' value='" + html_escape(person.lname) + "'/></p>";
	html += "<p><label>Address</label><input name='address' value='" + html_escape(person.address) + "'/></p>";
	html += "<p><button>Save</button></p>";
	html += "</form>";

	return html;
}

// TELEPHONES
function render_telephones(person, telephones) {
	var html = '';

	html += "<p class='user_icon'>"+
			"<b>" + html_escape(person.fname + " " + person.lname) + "</b>, "+
			html_escape(person.address) +
		"</p>";

	html += "<table class='grid'>";
	html += "<tr>"+
		"<th>ID</td>"+
		"<th>Number</th>"+
		"<th>Type</th>"+
		"<th></th>"+
	"</tr>";
	for(var i=0; i<telephones.length; i++) {
		var tel = telephones[i];
		var teltype = get_teltype(tel.teltype_id);
		html += "<tr>"+
			"<td>" + tel.id + "</td>" +
			"<td>" + html_escape(tel.number) + "</td>" +
			"<td>" + html_escape(teltype.name) + "</td>" +
			"<td>" +
				"<a href='#' data-person-id='" + person.id + "' data-telephone-id='" + tel.id + "' class='edit_icon telephone-edit'>Edit</a> " +
				"<a href='#' data-person-id='" + person.id + "' data-telephone-id='" + tel.id + "' class='delete_icon telephone-delete'>Delete</a>" +
			"</td>"+
		"</tr>";
	}
	html += "</table>";

	html += "<p>" +
		"<a href='#' data-person-id='" + person.id + "' class='add_icon telephone-add'>Add New Telephone</a> " +
		"<a href='#' data-person-id='" + person.id + "' class='refresh_icon telephones-refresh'>Refresh</a>" +
		"</p>";

	return html;
}

function render_telephone_form(telephone) {
	if(!telephone) return 'Empty telephone.';

	var html = '';
	var title = (telephone.id) ? 'Edit Telephone' : 'Add Telephone';

	html += "<h1>" + title + "</h1>";
	html += "<form action='#' method='post'>";
	html += "<p><label>ID</label><input name='id' value='" + html_escape(telephone.id) + "' readonly='readonly' /></p>";
	html += "<p><label>PERSON_ID</label><input name='person_id' value='" + html_escape(telephone.person_id) + "' readonly='readonly' /></p>";
	html += "<p><label>Number</label><input name='number' value='" + html_escape(telephone.number) + "'/></p>";

	html += "<p><label>Type</label>";
	html += "<select name='teltype_id' class='txt medium'>";
	html += "<option value=''> </option>";
	for(var i = 0; i < TELTYPES.length; i++) {
		var teltype = TELTYPES[i];
		var selected = (telephone.teltype_id === teltype.id) ? 'selected' : '';
		html += "<option value='" + teltype.id + "' " + selected + ">" + teltype.name + "</option>";
	}
	html += "</select>";
	html += "</p>";

	html += "<p><button>Save</button></p>";
	html += "</form>";

	return html;
}

function render_messages(messages) {
	var html = '';
	if(messages) {
		for(var i = 0; i < messages.length; i++) {
			var m = messages[i];
			var css = (m.type === 'error') ? 'error_icon' : 'info_icon';
			html += "<p class='" + css + "'>" + m.text + "</p>";
		}
	}
	return html;
}

function get_teltype(teltype_id) {
	// TELTYPES is global variable preloaded on client start.
	for(var i=0; i < TELTYPES.length; i++) {
		if(TELTYPES[i].id == teltype_id) {
			return TELTYPES[i];
		}
	}
	return null;
}

function html_escape(val) {
	return (val+'')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&apos;');
}
