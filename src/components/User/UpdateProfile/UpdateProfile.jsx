import "./UpdateProfile.css"
import {Fragment} from "react"
import { AiOutlineMail } from "react-icons/ai";
import { BiLockOpen } from "react-icons/bi";
import { BiFace } from "react-icons/bi";
import {useState,useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import { clearErrors, loadUser, updateProfile } from '../../../actions/userAction';
import Loader from '../../layout/Loader/Loader'
import MetaData from '../../layout/MetaData'
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants"
function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
  
    reader.onload = () => {
      if (reader.readyState === 2) {
        const image = new Image();
        image.src = reader.result;
  
        image.onload = () => {
          const maxWidth = 400;
          const maxHeight = 400;
  
          let width = image.width;
          let height = image.height;
  
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
  
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
  
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, width, height);
  
          const resizedImage = canvas.toDataURL("image/jpeg");
  
          setAvatarPreview(resizedImage);
          setAvatar(resizedImage);
        };
      }
    };
  
    reader.readAsDataURL(e.target.files[0]);
  };
  

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      // alert.error(error);
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully ", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // alert()
      dispatch(loadUser());

      navigate("/account")

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <BiFace />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <AiOutlineMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateProfile
