import React, { useEffect, useRef, useState, UseState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import profile_default from './Image/profile_default.png';
import './Setting.css';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ip from './ipaddress';

function img_src(d) {
  if (
    d.profile_url == null ||
    d.profile_url == '' ||
    d.profile_url == undefined
  ) {
    return profile_default;
  } else {
    return d.profile_url;
  }
}

function Setting() {
  return (
    <div>
      <Navbar1 />
      <Navbar2 />
      <Outlet />
    </div>
  );
}

function ProfileSetting() {
  const navigate = useNavigate();
  const [details, SetDetails] = useState({
    FirstName: '',
    profile_url: '',
    MailId: '',
  });

  useEffect(() => {
    const user = { UserId: localStorage.getItem('UserId') };
    axios
      .get(`http://${ip}:8000/user_name`, {
        params: user,
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(
        (res) => {
          SetDetails(res.data);
        },
        (err) => {
          navigator('/login');
        }
      );
  }, []);

  return (
    <div className="ProfileSetting">
      <div className="ProfileSettingCenter">
        <img src={img_src(details)} className="ProfileImageSetting" />
        <div className="UserName">{details.FirstName}</div>
        <div className="UserName">{details.MailId}</div>
        <div className="AllButton">
          <div
            className="PasswordEditButtom"
            onClick={() => {
              navigate('/setting/edit_password');
            }}
          >
            Edit Password
          </div>
          <div
            className="ProfileEditButtom"
            onClick={() => {
              navigate('/setting/edit_profile');
            }}
          >
            Edit Profile
          </div>
        </div>
      </div>
    </div>
  );
}

function EditProfileSetting() {
  const navigate = useNavigate();
  const [image, SetImage] = useState(profile_default);
  const InputImage = useRef();
  const InputName = useRef();
  const InputMail = useRef();

  useEffect(() => {
    const user = { UserId: localStorage.getItem('UserId') };
    axios
      .get(`http://${ip}:8000/user_name`, {
        params: user,
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(
        (res) => {
          SetImage(img_src(res.data));
          InputName.current.value = res.data.FirstName;
          InputMail.current.value = res.data.MailId;
        },
        (err) => {
          navigator('/login');
        }
      );
  }, []);

  const ChangeImage = () => {
    if (InputImage.current.files[0].type.split('/')[0] != 'image') {
      window.alert('Please Insert Image Only');
      return;
    }
    SetImage(URL.createObjectURL(InputImage.current.files[0]));
  };

  return (
    <div className="ProfileSetting">
      <div className="ProfileSettingCenter">
        <img
          src={image}
          className="ProfileImageSetting"
          onClick={() => {
            InputImage.current.click();
          }}
        />
        <input
          ref={InputImage}
          type="file"
          id="img"
          name="img"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={ChangeImage}
        />
        <input
          type="text"
          ref={InputName}
          className="UserNameInput"
          placeholder="Enter User Name"
        />
        <input
          type="text"
          ref={InputMail}
          className="UserNameInput"
          placeholder="Enter Mail Id"
        />
        <div className="AllButton">
          <div
            className="PasswordEditButtom"
            onClick={() => {
              navigate('/setting/profile');
            }}
          >
            Cancel
          </div>
          <div
            className="ProfileEditButtom"
            onClick={() => {
              EditProfileDataBackend(
                InputName.current.value,
                InputMail.current.value,
                InputImage.current.files[0],
                navigate
              );
            }}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
}

function EditPassword() {
  const [WrongPassword, SetWrongPassword] = useState(false);
  const [resone, SetResone] = useState('');
  const navigate = useNavigate();
  const OP = useRef();
  const NP = useRef();
  const NCP = useRef();

  const StyleForWrongPassword = () => {
    if (WrongPassword) {
      return { display: 'block' };
    } else {
      return { display: 'none' };
    }
  };

  return (
    <div className="ProfileSetting">
      <div className="ProfileSettingCenter">
        <input
          ref={OP}
          type="password"
          className="UserNameInput"
          placeholder="Enter Old Password"
        />
        <input
          ref={NP}
          type="password"
          className="UserNameInput"
          placeholder="Enter New Password"
        />
        <input
          ref={NCP}
          type="text"
          className="UserNameInput"
          placeholder="Confirm New Password"
        />
        <p className="WrongPasword" style={StyleForWrongPassword()}>
          {resone}
        </p>
        <div className="AllButton">
          <div
            className="PasswordEditButtom"
            onClick={() => {
              navigate('/setting/profile');
            }}
          >
            Cancel
          </div>
          <div
            className="ProfileEditButtom"
            onClick={() => {
              EditPasswordBackend(
                OP.current.value,
                NP.current.value,
                NCP.current.value,
                SetWrongPassword,
                SetResone,
                navigate
              );
            }}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
}

function EditPasswordBackend(
  OP,
  NP,
  NCP,
  SetWrongPassword,
  SetResone,
  navigate
) {
  if (NP != NCP) {
    SetWrongPassword(true);
    SetResone('New Passwords are not match');
    return;
  }
  const data = {
    UserId: localStorage.getItem('UserId'),
    OldPassword: OP,
    NewPassword: NP,
  };

  axios
    .get(`http://${ip}:8000/edit_password`, {
      params: data,
      headers: { authorization: localStorage.getItem('token') },
    })
    .then(
      (res) => {
        if (res.data.changedRows == 0) {
          SetWrongPassword(true);
          SetResone('Please Check Over Old Password');
        } else {
          window.alert('Password Update Successfully');
          navigate('/setting/profile');
        }
      },
      (err) => {
        SetWrongPassword(true);
        SetResone('Error Please Try Later');
      }
    );
}

function EditProfileDataBackend(name, mail, image, navigate) {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'urq6ogoq');

  const options = {
    method: 'POST',
    body: data,
  };

  fetch('https://api.cloudinary.com/v1_1/diu2ciwjz/image/upload', options)
    .then((res) => res.json())
    .then((res) => {
      const UserData = {
        UserId: localStorage.getItem('UserId'),
        name: name,
        mail: mail,
        profile_url: res.secure_url,
      };
      axios
        .get(`http://${ip}:8000/edit_user_data`, {
          params: UserData,
          headers: { authorization: localStorage.getItem('token') },
        })
        .then(
          (res) => {
            if (res.message == 'Email Id Used') {
              window.alert('Mail Id Is Used');
              return;
            } else {
              window.alert('Your Profile is edit successful');
              navigate('/setting/profile');
            }
          },
          (err) => {
            navigate('/login');
          }
        );
    })
    .catch((err) => {
      navigate('/login');
    });
}

export { Setting, ProfileSetting, EditProfileSetting, EditPassword };
