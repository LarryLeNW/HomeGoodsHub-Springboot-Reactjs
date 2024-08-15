import Loading from "components/Loading";
import { memo } from "react";
import { useCommonStore } from "store/common.store";
function Modal() {
    const { modal, showModal } = useCommonStore();

    return (
        <>
            {modal.isShow && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center "
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}
                    onClick={() =>
                        !modal.isAction &&
                        showModal({
                            isShowModal: false,
                        })
                    }
                >
                    {modal.children || <Loading />}
                </div>
            )}
        </>
    );
}

export default memo(Modal);
