import { notification } from "antd";
import { createUser, updateUser } from "apis";
import logo from "assets/logo.png";
import InputForm from "components/Form/InputForm";
import SelectForm from "components/Form/SelectForm";
import { ROLE } from "constant/roleUser";
import withBaseComponent from "hocs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCommonStore } from "store/common.store";

function UserForm({ userCurrent, callbackUpdateAfter, dispatch }) {
    const { showModal } = useCommonStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    useEffect(() => {
        if (userCurrent) {
            setValue("email", userCurrent["email"]);
            setValue("phone", userCurrent["phone"]);
            setValue("username", userCurrent["username"]);
            setValue("address", userCurrent["address"]);
            setValue("role_id", userCurrent["role"].roleId);
            setValue("status", userCurrent["status"]);
        }
    }, []);

    const handleUpdate = async (data) => {
        try {
            let response;
            if (userCurrent?.userId) {
                response = await updateUser(userCurrent.userId, {
                    ...data,
                    role: {
                        roleId: +data.role_id,
                    },
                });
                notification.success({
                    message: "User updated successfully",
                });
            } else {
                response = await createUser({
                    ...data,
                    role: {
                        roleId: +data.role_id,
                    },
                });
                notification.success({
                    message: "User created successfully",
                });
            }
            callbackUpdateAfter();
            showModal({ isShow: false });
        } catch (error) {
            console.error("Error in handleUpdate:", error);
            const errorMessage = userCurrent?._id
                ? "User update failed"
                : "Create failed";
            notification.error({
                message: `${errorMessage}: ${error.message}`,
            });
        }
    };

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className=" w-[50%] flex flex-col justify-center items-center  bg-white rounded  z-40 border-main border p-4 gap-2 text-black "
        >
            <div className="flex flex-col justify-center  w-full items-center">
                <img
                    src={logo}
                    alt="logo"
                    className="w-[300px] object-contain"
                />
                <h2 className="text-center border border-y-main w-full">
                    {userCurrent ? `Form Edit User` : "Form Create User"}
                </h2>
            </div>
            <form
                onSubmit={handleSubmit(handleUpdate)}
                className="flex flex-col w-full gap-2"
            >
                <InputForm
                    errors={errors}
                    id={"email"}
                    register={register}
                    fullWidth
                    validate={{
                        required: `Require this field`,
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                        },
                    }}
                />
                {!userCurrent && (
                    <InputForm
                        errors={errors}
                        id={"password"}
                        register={register}
                        fullWidth
                        validate={{
                            required: `Require this field`,
                        }}
                    />
                )}

                <InputForm
                    errors={errors}
                    id={"username"}
                    register={register}
                    validate={{ required: `Require this field` }}
                    fullWidth
                />
                <InputForm
                    errors={errors}
                    id={"address"}
                    register={register}
                    validate={{ required: `Require this field` }}
                    fullWidth
                />
                <InputForm
                    errors={errors}
                    id={"phone"}
                    register={register}
                    validate={{ required: `Require this field` }}
                    fullWidth
                />
                <SelectForm
                    errors={errors}
                    id={"role_id"}
                    register={register}
                    validate={{ required: `Require this field` }}
                    fullWidth
                    options={{ USER: 1, ADMIN: 3, MANAGER: 4 }}
                />
                <SelectForm
                    errors={errors}
                    id={"status"}
                    register={register}
                    validate={{ required: `Require this field` }}
                    fullWidth
                    options={{ active: "active", block: "block" }}
                />
                <button className="w-full p-2 bg-main text-white" type="submit">
                    {userCurrent ? `Update` : "Create"}
                </button>
            </form>
        </div>
    );
}

export default withBaseComponent(UserForm);
