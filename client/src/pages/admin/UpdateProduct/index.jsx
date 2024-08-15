import { notification } from "antd";
import { getProductCategories } from "apis";
import { createProduct, getProduct, updateProduct } from "apis/product";
import InputForm from "components/Form/InputForm";
import MarkdownEditor from "components/Form/MarkdownEditor";
import SelectForm from "components/Form/SelectForm";
import withBaseComponent from "hocs";
import QueryString from "qs";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCommonStore } from "store/common.store";
import Swal from "sweetalert2";
import { convertBase64ToImage, convertImageToBase64 } from "utils/file";
import { validate } from "utils/helper";
import ICONS from "utils/icons";
import path from "utils/path";

function UpdateProduct({ location }) {
    const { showModal } = useCommonStore();
    const { search } = location;
    let searchParams = QueryString.parse(search, { ignoreQueryPrefix: true });
    const [currentProduct, setCurrentProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    console.log("🚀 ~ UpdateProduct ~ categories:", categories);
    const [previewImg, setPreviewImg] = useState([]);
    const [imgUpload, setImageUpload] = useState([]);
    const [payload, setPayload] = useState({ description: "" });
    const [invalidFields, setInvalidFields] = useState([]);
    const [indexImgHover, setIndexImgHover] = useState(null);

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        watch,
        setValue,
    } = useForm();

    // fetch product category
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getProductCategories();
            setCategories(response.content);
        };
        fetchCategories();
    }, []);

    // fetch product
    useEffect(() => {
        const fetchProduct = async (pid) => {
            try {
                const response = await getProduct(pid);
                console.log("🚀 ~ fetchProduct ~ response:", response);
                setCurrentProduct(response);
            } catch (error) {
                Swal.fire("Action Product", error.message, "error");
            }
        };

        if (!!searchParams?.edit && !!searchParams?.pid)
            fetchProduct(searchParams?.pid);
    }, []);

    // filter product update to form
    useEffect(() => {
        console.log("🚀 ~ handleFillToForm ~ currentProduct:", currentProduct);

        const handleFillToForm = async () => {
            if (currentProduct) {
                setValue("categoryId", currentProduct?.category.categoryId);
                setValue("name", currentProduct?.name);
                setValue("unitPrice", currentProduct?.unitPrice);
                setValue("sold", currentProduct?.sold);
                setValue("quantity", currentProduct?.quantity);
                setValue("discount", currentProduct?.discount);
                setValue("status", currentProduct?.status);
                payload.description = currentProduct?.description.toString();
                setImageUpload([]);
                setPreviewImg([]);

                if (currentProduct?.thumb) {
                    setPreviewImg([currentProduct?.thumb]);
                    let file = await convertBase64ToImage(
                        currentProduct?.thumb
                    );
                    setImageUpload([file]);
                }

                if (currentProduct?.images) {
                    setPreviewImg((prev) => [
                        ...prev,
                        ...currentProduct?.images.split(","),
                    ]);

                    for (let image of currentProduct?.images.split(",")) {
                        let file = await convertBase64ToImage(image);
                        setImageUpload((prev) => [...prev, file]);
                    }
                }
            }
        };

        handleFillToForm();
    }, [currentProduct]);

    const changeValue = useCallback(
        (e) => {
            setPayload(e);
        },
        [payload]
    );

    const handleConvertFile = async (files) => {
        for (let file of files) {
            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                notification.error({ message: "File not supported..." });
                return;
            }
            let base64 = await convertImageToBase64(file);
            setPreviewImg((prev) => [base64, ...prev]);
            setImageUpload((prev) => [file, ...prev]);
        }
    };

    const handleUpdateProduct = async (data) => {
        if (imgUpload.length == 0) {
            notification.error({
                message: "Please upload at least one image...",
            });
            return;
        }
        const invalids = validate(payload, setInvalidFields);
        if (!invalids || invalids === 0) {
            showModal({ isShowModal: true, isAction: true });
            const dataPayload = {
                ...data,
                ...payload,
            };
            const formData = new FormData();
            for (let i of Object.entries(dataPayload))
                formData.append(i[0], i[1]);

            if (imgUpload) {
                for (let i = 1; i < imgUpload.length - 1; i++) {
                    formData.append("images", imgUpload[i]);
                }
                formData.append("thumb", imgUpload[0]);
            }

            try {
                let response;
                if (currentProduct)
                    response = await updateProduct(
                        currentProduct?.productId,
                        formData
                    );
                else response = await createProduct(formData);

                if (response)
                    Swal.fire(
                        "Action Product",
                        `Product ${
                            !!currentProduct ? "updated" : "created"
                        } successfully`,
                        "success"
                    );
                else Swal.fire("Action Product", response, "error");
            } catch (error) {
                Swal.fire("Action Product", "Something went wrong...", "error");
            } finally {
                showModal({ isShowModal: false });
            }
        }
    };

    const setHoverImgReview = (i) => {
        setIndexImgHover(i);
    };

    const handleRemoveImg = (index) => {
        const uploadImg = [...imgUpload];
        uploadImg.splice(index, 1);
        setImageUpload(uploadImg);
        const newPreviewImg = [...previewImg];
        newPreviewImg.splice(index, 1);
        setPreviewImg(newPreviewImg);
    };

    return (
        <div className="w-full p-4 flex flex-col overflow-auto ">
            <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
                <div>{currentProduct ? "Update " : "Create "} Product</div>
                <Link
                    to={path.ADMIN.PRODUCT_MANAGEMENT}
                    className="flex items-center gap-2 text-main cursor-pointer"
                >
                    Back to list <ICONS.AiFillProduct />
                </Link>
            </div>
            <div className="p-4">
                <div className="flex gap-2  overflow-auto">
                    {!!previewImg &&
                        previewImg?.map((img, index) => (
                            <div
                                onMouseEnter={() => setHoverImgReview(index)}
                                key={index}
                                className="relative w-[200px] h-[30vh]"
                            >
                                <img
                                    src={img}
                                    alt="preview "
                                    className={`w-[200px]  h-[30vh] `}
                                />
                                {indexImgHover != NaN &&
                                    indexImgHover === index && (
                                        <span
                                            onClick={() =>
                                                handleRemoveImg(index)
                                            }
                                            className="animate-scale-up-center absolute top-2 right-2 text-red-white bg-rose-500 w-10 h-10 text-center cursor-pointer hover:bg-red-600 p-2 rounded-[50%] border-2"
                                        >
                                            X
                                        </span>
                                    )}
                            </div>
                        ))}
                </div>

                <form
                    onSubmit={handleSubmit(handleUpdateProduct)}
                    className="flex flex-col gap-2"
                >
                    <div>
                        <input
                            type="file"
                            placeholder="chose image product..."
                            id={"images"}
                            onChange={(e) => handleConvertFile(e.target.files)}
                            multiple
                            accept=".jpg, .jpeg, .png"
                        />
                        {errors["images"] && (
                            <small className="text-xs text-red-500 text-end">
                                {errors["images"].message}
                            </small>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <InputForm
                            errors={errors}
                            id={"name"}
                            register={register}
                            fullWidth
                            validate={{
                                required: `Require this field`,
                            }}
                            style={"flex-1 "}
                        />
                        <InputForm
                            errors={errors}
                            id={"sold"}
                            register={register}
                            fullWidth
                            validate={{
                                required: `Require this field`,
                            }}
                            type="number"
                            style={"flex-1 "}
                        />
                    </div>

                    <div className="flex gap-3 text-sm">
                        <InputForm
                            errors={errors}
                            id={"unitPrice"}
                            register={register}
                            validate={{
                                required: `Require this field`,
                            }}
                            type="number"
                            style={"flex-1 "}
                        />
                        <InputForm
                            errors={errors}
                            id={"quantity"}
                            register={register}
                            validate={{
                                required: `Require this field`,
                            }}
                            type="number"
                            style={"flex-1"}
                        />
                        <InputForm
                            errors={errors}
                            id={"discount"}
                            register={register}
                            validate={{
                                required: `Require this field`,
                            }}
                            label={"Discount"}
                            type="number"
                            style={"flex-1"}
                        />
                    </div>
                    <div className="flex gap-3">
                        <SelectForm
                            errors={errors}
                            id={"categoryId"}
                            register={register}
                            validate={{ required: `Require this field` }}
                            fullWidth
                            defaultValue={
                                currentProduct?.category.categoryId || null
                            }
                            options={categories?.reduce(
                                (prev, el) => ({
                                    ...prev,
                                    [el.name]: el.categoryId,
                                }),
                                {}
                            )}
                        />
                    </div>
                    <div className="flex gap-3">
                        <SelectForm
                            errors={errors}
                            id={"status"}
                            register={register}
                            validate={{ required: `Require this field` }}
                            fullWidth
                            defaultValue={currentProduct?.status || null}
                            options={{
                                BLOCKED: "false",
                                ACTIVE: "true",
                            }}
                        />
                    </div>
                    <MarkdownEditor
                        label={"Description : "}
                        name={"description"}
                        value={payload.description.toString()}
                        changeValue={changeValue}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <button
                        className="w-full p-2 bg-main text-white"
                        type="submit"
                    >
                        {currentProduct ? `Update` : "Create"} Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default withBaseComponent(UpdateProduct);
