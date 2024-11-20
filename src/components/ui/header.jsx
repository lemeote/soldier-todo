const Header = ({handleFileUpload, handleUpdateScores}) => {

    return (
        <>
        <div className="text-center mt-5">
            <span className="font-bold text-3xl">首都圏の総人口</span>
        </div>
        <div className="text-center mt-5">
            <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ margin: "10px" }}
            />
            <button
            onClick={handleUpdateScores}
            className="py-2 px-5 bg-[#007bff] text-white rounded-md cursor-pointer"
            >
            友好度確認
            </button>
        </div>
      </>
    )
}

export default Header;