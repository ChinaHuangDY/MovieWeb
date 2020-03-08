<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Test.aspx.cs" Inherits="jquery_autocomplete_Test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="jquery.autocomplete.css" rel="stylesheet" />
    <link href="lib/thickbox.css" rel="stylesheet" />
    <script src="lib/jquery.js"></script>
    <script src="lib/thickbox-compressed.js"></script>
    <script src="jquery.autocomplete.js"></script>
    <script type="text/javascript">

        var emails = [
                        { name: "Peter Pan", to: "peter@pan.de" },
                        { name: "Molly", to: "molly@yahoo.com" },
                        { name: "Forneria Marconi", to: "live@japan.jp" },
                        { name: "Master <em>Sync</em>", to: "205bw@samsung.com" },
                        { name: "Dr. <strong>Tech</strong> de Log", to: "g15@logitech.com" },
                        { name: "Don Corleone", to: "don@vegas.com" },
                        { name: "Mc Chick", to: "info@donalds.org" },
                        { name: "Donnie Darko", to: "dd@timeshift.info" },
                        { name: "Quake The Net", to: "webmaster@quakenet.org" },
                        { name: "Dr. Write", to: "write@writable.com" } ];

        $(function () {
            $("#email").autocomplete(emails, {
                minChars: 0,
                width: 310,
                matchContains: "word",
                autoFill: false,
                formatItem: function (row, i, max) {
                    return i + "/" + max + ": \"" + row.name + "\" [" + row.to + "]";
                },
                formatMatch: function (row, i, max) {
                    return row.name + " " + row.to;
                },
                formatResult: function (row) {
                    return row.to;
                }
            });

            //function format(mail) {
            //    return mail.name + " &lt;" + mail.to + "&gt";
            //}
            //$("#email").autocomplete('emails.php', {
            //    multiple: true,
            //    dataType: "json",
            //    parse: function (data) {
            //        return $.map(data, function (row) {
            //            return {
            //                data: row,
            //                value: row.name,
            //                result: row.name + " <" + row.to + ">"
            //            }
            //        });
            //    },
            //    formatItem: function (item) {
            //        return format(item);
            //    }
            //}).result(function (e, item) {
            //    $("#content").append("<p>selected " + format(item) + "</p>");
            //});
        });
</script>
</head>

<body>
    <form id="form1" runat="server">
        <input cols="120" id="email" style="height:30px"></input>
    </form>
</body>
</html>
