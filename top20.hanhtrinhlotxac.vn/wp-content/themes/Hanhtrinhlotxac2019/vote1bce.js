/* ------------ VOTE FUNCTION -------------------*/

/*XỬ LÝ LOAD VOTE REALTIME THEO CLASS .loadvote*/
function load_vote() {
	var post_id = $('.vote').data('id');
	$(".loadvote").load("/vote_api.php?count_vote=1&post_id=" + post_id);
	$('.votenumb').removeClass('loadvote');
}
var auto_refresh = setInterval(function () {
	load_vote();
}, 1000);

/* TEMP LATE DỰ ĐOÁN BÌNH CHỌN */
let frmVoters = `
	<div class="frmVoters">
		 <input id="frmVoters_name" type="text" placeholder="Tên: "/>
		 <input id="frmVoters_phone" type="text" placeholder="Số điện thoại: "/>
		 <input id="frmVoters_number" type="text" placeholder="Dự đoán số lượt bình chọn: "/>
		 <input id="frmVoters_link" type="hidden" value="" />
		 <button id="frmVoters_send">Gửi Bình Chọn</button>
	</div>
	<script>
		sendVoters();	
	</script>
`;

/*XỬ LÝ HÀM CLICK VOTE ĐỦ ĐIỀU KIỆN*/
$('.thiSinhPost__info').on('click', '.vote.vote-none', function () {
	var post_id = $(this).data('id');
	var fbid = $(this).data('fbid');

	//Check thời hạn vote năm / tháng / ngày / giờ
	var older = new Date("2020-10-03 20:00");
	now = new Date();
	//Quá thời hạn
	if (now.getTime() >= older) {
		$('#binhluan').addClass('hidden');
		$('#modal-thongbao .modal-body').html('Đã hết thời gian bình chọn!');
		$("#modal-thongbao").css({ "display": "block" });
	} else {
		if (fbid != '') {
			$.post("/vote_api.php", { vote: 1, fbid: fbid, post_id: post_id },
				function (result) {
					var json = $.parseJSON(result);
					var check_vote = json.check_vote;
					var vote = json.vote;
					if (check_vote == '1') { //Xử lý đã vote
						$('#modal-thongbao .modal-body').html('Bạn đã bình chọn cho bài này rồi');
						$("#modal-thongbao").css({ "display": "block" });
					} else if (check_vote == '0' && vote == '1') { //Xử lý chưa vote
						$(".vote").html("Đã bình chọn");
						$('.vote').removeClass('vote-none');
						$('.vote').addClass('voted');
						var share = $('#sharediv').html();
						$('#modal-thongbao .modal-title').html('Chúc mừng bạn đã Bình chọn thành công!');
						$('#modal-thongbao .modal-body').html('<div class="thiSinhPost__note" <p>*Tặng bạn ưu đãi 30% dịch vụ PTTM </p><p>*10 suất Thẩm mỹ trị giá 50 TRĐ (khi thí sinh bạn Bình chọn lọt Top 10 và bạn dự đoán gần đúng nhất &amp; sớm nhất số người bình chọn cho thí sinh đó) </p><p>* Thời gian: 24/09 - 03/10</p></div>' + frmVoters);
						$("#modal-thongbao").css({ "display": "block" });
						$('.votenumb').addClass('loadvote');
					} else {
						alert('Error');
					}
				});
		} else { //Xử lý không có FBID
			$('#modal-thongbao .modal-body').html('Bạn cần đăng nhập để bình chọn!');
			$("#modal-thongbao").css({ "display": "block" });
			loginfb();
		}
	}



});

/*FACEBOOK API*/
/* 1.CẤU HÌNH*/
window.fbAsyncInit = function () {
	FB.init({
		appId: '134569250596152',
		cookie: true,  // enable cookies to allow the server to access 
		// the session
		xfbml: true,  // parse social plugins on this page
		version: 'v2.8' // use graph api version 2.8
	});
	FB.getLoginStatus(function (response) {
		statusChangeCallback(response);
	});

};

// Load SDK asynchronously
(function (d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* 2.KIỂM TRA TÌNH TRẠNG LOGIN ACCOUNT*/
function statusChangeCallback(response) {
	/* 2.1.FB trả về đã login */
	if (response.status === 'connected') {
		/* Lấy ID UserFB */
		var userID = response.authResponse.userID;
		/* Thêm Class Logged, thêm thông tin IDFB */
		$('.vote').addClass('logged');
		var post_id = $('.vote').data('id');
		$('.vote').attr("data-fbid", userID);

		/* Check tình trạng Vote của User khi Loadpage */
		$.post("/vote_api.php", { check_vote: 1, fbid: userID, post_id: post_id },
			function (result) {
				var json = $.parseJSON(result);
				var check_vote = json.check_vote;
				if (check_vote == '0') {
					/* Chưa vote thì add class cho vote */
					$('.vote').addClass('vote-none');
				} else {
					/* Đã vote thì add class, hiển thị đã vote rồi */
					$('.vote').addClass('voted');
					$(".vote").html("Đã bình chọn");
				}
			});

	} else {
		/* 2.1.FB trả về chưa login 
			- Xóa bỏ class vote-none (không cho vote)
			- thêm class vote-login (yêu cầu đăng nhập)
		*/
		$('.vote').removeClass('vote-none');
		$('.vote').addClass('vote-login');
	}
}

/* Hàm kiểm tra login*/
function checkLoginState() {
	FB.getLoginStatus(function (response) {
		statusChangeCallback(response);
	});
}

/* Hàm login*/
function loginfb() {
	FB.login(function (response) {
		if (response.authResponse) {
			console.log('Welcome!  Fetching your information.... ');
			FB.api('/me', function (response) {
				/* Đã login, xóa class yêu cầu đăng nhập, thêm class đã đăng nhập, Reload page*/
				$('.vote').removeClass('vote-login');
				$('.vote').addClass('logged');
				location.reload();
			});
		} else {

		}
	});
}

/* Nếu chưa login mà click Vote thì yêu cầu đăng nhập*/
$('.thiSinhPost__info').on('click', '.vote.vote-login', function () {
	loginfb();
});

/* Hàm đóng Modal */
function closeModal(){
	let modalNote = document.getElementById('modal-thongbao');
	modalNote.style.display = 'none';
}

/* Hàm xử lý Send Dự Đoán */
function sendVoters() {
	let frmVoters_send = document.getElementById('frmVoters_send');
	frmVoters_send.addEventListener('click', () => {
		let name = document.getElementById('frmVoters_name');
		let phone = document.getElementById('frmVoters_phone');
		let numb = document.getElementById('frmVoters_number');
		// let link = document.getElementById('frmVoters_link');
		let link_ts = document.getElementById('link-ts');
		link = link_ts.innerHTML;
		validateForm(name, phone, numb, link);
	});
};

/* Hàm Kiểm Tra Form Dự Đoán */
function validateForm(name, phone, numb, link) {
	if (name.value == "") {
		alert("Bạn chưa nhập Tên");
		name.setAttribute("class", "border");
		return false;
	} else {
		name.removeAttribute("class");
	}
	if (phone.value == "") {
		alert("Bạn chưa nhập số điện thoại");
		phone.setAttribute("class", "border");
		return false;

	} else if (isNaN(phone.value)) {
		alert("Số điện thoại của bạn có ký tự");
		phone.setAttribute("class", "border");
		return false;
	} else if (!getValidNumber(phone.value)) {
		alert("Số điện thoại của bạn không đúng");
		phone.setAttribute("class", "border");
		return false;
	} else {
		phone.removeAttribute("class");
	}

	if (numb.value == "") {
		alert("Bạn chưa nhập Số lượt bình chọn");
		numb.setAttribute("class", "border");
		return false;
	} else {
		numb.removeAttribute("class");
	}
	sendSheet(name.value, phone.value, numb.value, link);
	alert('Bạn đã gửi thành công');
}

/* Check Số điện thoại */
function getValidNumber(value) {
	value = value.trim();
	if (value.substring(0, 1) == '1') {
		value = value.substring(1);
	}
	if (value.length == 10) {
		return value;
	}
	return false;
}

/* Hàm xử lý Sheet */
function sendSheet(js_name, js_phone, js_numb, js_link) {
	$.ajax({
		url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfDXyClS0396edCQltJtwzJPGMKyRLNnQUqjV7ca8ZtPMTYVQ/formResponse",
		data: {
			"entry.18696594": js_name,
			"entry.1386407017": js_phone,
			"entry.539214794": js_numb,
			"entry.981549838": js_link,

		},
		type: "POST",
		dataType: "xml",
		statusCode: {
			0: function () {
				console.log('Succcess 1');
				closeModal();
				
			},
			200: function () {
				console.log('Succcess 2');
				closeModal();
			}
		}
	});
}

/* ------------END VOTE FUNCTION -------------------*/