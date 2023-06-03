import { verifyuser } from "../../../actions/userAction"
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Loader from "../../layout/Loader/Loader";
import TokenExpired from "../TokenExpired/TokenExpired";
import VerificationMessage from "../VerificationMessage/VerificationMessage";
function Verify() {
  const dispatch = useDispatch();
  const { token } = useParams()
  const { loading, isVerified } = useSelector(state => state.userVerify);
  useEffect(() => {
    dispatch(verifyuser(token));



  }, [dispatch, token])

  return (
    <>
      {loading ? <Loader /> :
        (
          <>
            {isVerified ? <VerificationMessage /> : <TokenExpired />}
          </>
        )
      }
    </>
  )
}

export default Verify
