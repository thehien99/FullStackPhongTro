import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputForm from "../../InputForm/InputForm";
import ButtonFrom from "../../InputForm/ButtonFrom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, register } from "../../../redux/actions/authActions";
import validate from "../../../utils/validatefield";

const Login = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = useSelector(state => state.auth.isLogin)
  const [isRegister, setIsRegister] = useState(location.state?.flag)
  const [payload, setPayLoad] = useState({
    phone: '',
    name: '',
    password: '',
  })
  const [invalids, setInValids] = useState([])

  useEffect(() => {
    setIsRegister(location.state?.flag)
  }, [location.state?.flag])

  useEffect(() => {
    isLogin && navigate("/")
  }, [isLogin])

  const handleSubmit = async () => {
    let finalPayLoad = isRegister
      ? payload
      : {
        phone: payload.phone,
        password: payload.password
      }
    let invalids = validate(finalPayLoad, setInValids)
    if (invalids === 0) {
      isRegister
        ? dispatch(register(payload))
        : dispatch(userLogin(payload))
    }
  }

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='bg-white w-[600px] p-[30px] pb-[100px] mt-14 rounded-md shadow-2xl'>
        <h3 className='font-semibold text-2xl mb-3'>{isRegister ? 'Đăng kí tài khoản' : 'Đăng Nhập'}</h3>
        <div className='w-full flex flex-col gap-5'>
          {isRegister &&
            <InputForm
              label={'Họ và Tên'}
              keyPayLoad={'name'}
              value={payload.name}
              setValue={setPayLoad}
              setInValids={setInValids}
              invalids={invalids}
            />
          }
          <InputForm
            label={'Số điện thoại'}
            keyPayLoad={'phone'}
            value={payload.phone}
            setInValids={setInValids}
            invalids={invalids}
            setValue={setPayLoad}
          />
          <InputForm
            label={'Mật Khẩu'}
            keyPayLoad={'password'}
            value={payload.password}
            type='password'
            setInValids={setInValids}
            invalids={invalids}
            setValue={setPayLoad}
          />
          <ButtonFrom
            text={isRegister ? "Đăng kí" : "Đăng nhập"}
            textColor="text-white"
            bgColor="bg-blue-700"
            onClick={handleSubmit}
          />
        </div>
        <div className="mt-7 flex items-center justify-between">
          {isRegister ? (
            <small>
              Bạn đã có tài khoản?{" "}
              <span
                onClick={() => {
                  setIsRegister(false);
                  setPayLoad({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Đăng nhập ngay
              </span>
            </small>
          ) : (
            <>
              <small className="text-[blue] hover:text-[red] cursor-pointer">
                Bạn quên mật khẩu
              </small>
              <small
                onClick={() => {
                  setIsRegister(true);
                  setPayLoad({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
                className="text-[blue] hover:text-[red] cursor-pointer"
              >
                Tạo tài khoản mới
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
