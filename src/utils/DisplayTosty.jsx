import { ToastContainer } from "react-toastify"

const DisplayToast = () => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
            />
        </>
    )
}

export default DisplayToast;
