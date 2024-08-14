// import { register } from "apis";
import Button from "components/Form/Button";
import InputField from "components/Form/InputField";
import InputForm from "components/Form/InputForm";
import paths from "constant/path";
import withBaseComponent from "hocs";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    generatePath,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useAuthStore } from "store/auth.store";
// import { loginRequest } from  "redux/slicers/auth.slicer";
import Swal from "sweetalert2";
import { validateForm } from "utils/helper";

function Login({ navigate }) {
    const { userInfo, loginRequest, dataLogin } = useAuthStore();

    const [searchParams] = useSearchParams();

    // const dispatch = useDispatch();

    const { isLoadingLogin } = false;
    const [isRegister, setIsRegister] = useState(false);
    const [inValidFields, setInValidFields] = useState({});
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);

    // const [payload, setPayload] = useState({
    //     email: "",
    //     password: "",
    //     username: "",
    // });

    // const resetPayload = () => {
    //     setPayload({
    //         email: "",
    //         password: "",
    //         username: "",
    //     });
    // };

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const handleAuth = useCallback(
        async (data) => {
            console.log("🚀 ~ data:", data);
            if (isRegister) {
                console.log("🚀 ~ isRegister:", isRegister);
                return;
            }
            loginRequest(data, navigate);
            // const { username, ...dataLogin } = payload;
            // if (isRegister) {
            //   setIsLoadingRegister(true);
            //   try {
            //     const response = await register(payload);
            //     const { message } = response;
            //     Swal.fire("Congratulation!", message, "success")
            //       .then(setIsRegister(false))
            //       .then(resetPayload());
            //   } catch (error) {
            //     Swal.fire("Oops!", error?.response?.data?.message, "error");
            //   }
            //   setIsLoadingRegister(false);
            // } else
            //   dispatch(
            //     loginRequest({
            //       dataLogin,
            //       onSuccess: () => {
            //         navigate(searchParams.get("redirect") || path.HOME);
            //       },
            //       onFailure: () => {
            //         Swal.fire("Oops!", "Email hoặc mật khẩu không đúng!", "error");
            //       },
            //     })
            //   );
        },
        [isRegister]
    );

    return (
        <div className="w-screen h-screen bg-outside flex justify-center items-center">
            <form
                onSubmit={handleSubmit(handleAuth)}
                className="w-[500px] bg-white min-h-[400px]  p-10 rounded-lg flex flex-col gap-4 items-center relative mx-2 text-sm"
            >
                <Link
                    className=" absolute top-2 left-2 cursor-pointer text-red-400"
                    to={paths.HOME}
                >
                    Trở lại 🏡
                </Link>
                <h1 className="text-main text-center font-bold  text-2xl mb-5  ">
                    {isRegister ? "Đăng kí" : "Đăng nhập"}
                </h1>
                {isRegister && (
                    <>
                        <InputForm
                            errors={errors}
                            id={"username"}
                            register={register}
                            fullWidth
                            validate={{
                                required: `Yêu cầu điền username...`,
                            }}
                        />
                    </>
                )}
                <InputForm
                    errors={errors}
                    id={"email"}
                    register={register}
                    fullWidth
                    validate={{
                        required: `Yêu cầu điền email...`,
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm,
                            message: "Email không đúng định dạng",
                        },
                    }}
                />
                <InputForm
                    errors={errors}
                    id={"password"}
                    register={register}
                    fullWidth
                    validate={{
                        required: `Yêu cầu điền password...`,
                        pattern: {
                            value: /^.{6,20}$/gm,
                            message: "Yêu cầu độ dài từ 6 đến 20.",
                        },
                    }}
                />
                <Button
                    type="submit"
                    name={isRegister ? "Đăng kí" : "Đăng nhập"}
                    fw
                    isLoading={dataLogin.isLoading}
                />
                <div className="flex justify-between w-full items-center mt-2 text-sm">
                    <Link
                        to={generatePath(paths.FORGOT_PASSWORD, {
                            type: "request",
                        })}
                        className="hover:text-main cursor-help"
                    >
                        Quên mật khẩu ?
                    </Link>
                    <span
                        className="hover:text-main cursor-pointer select-none text-sm"
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister
                            ? "Đăng nhập ngay."
                            : "Đăng kí tài khoản mới."}
                    </span>
                </div>
            </form>
        </div>
    );
}

export default withBaseComponent(Login);
