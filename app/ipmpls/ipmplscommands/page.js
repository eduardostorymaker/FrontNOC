export default function ipmplscommands () {

    const codeStyles = "bg-gray-300 text-black p-1 rounded-sm w-full" 
    const paragraphStyle = "mt-2 w-full" 
    const titleStyle = "flex justify-center p-2 font-bold text-red-700"
    const sectionStyle = "flex flex-col w-full"
    const itemStyle = "flex flex-col w-full"

    return(
        <div className="grid grid-cols-3 gap-2 p-2">
            <div className={sectionStyle}>
                <h2 className={titleStyle}>
                    ZTE
                </h2>
                <div className={itemStyle}>
                    <p className={paragraphStyle}>
                    Commandss
                    afdsdsa
                    </p>
                    <code className={codeStyles} >
                    asfddsaf
                    </code>
                    <code className={codeStyles} >
                    asfddsaf
                    </code>
                </div>
                <div className={itemStyle}>
                    <p className={paragraphStyle}>
                    Commandss
                    afdsdsa
                    </p>
                    <code className={codeStyles} >
                    asfddsaf
                    </code>
                </div>
            </div>
            <div className={sectionStyle}>
                <h2 className={titleStyle}>
                    Huawei
                </h2>
                <div className={itemStyle}>
                    <p className={paragraphStyle}>
                    Commandss
                    afdsdsa
                    </p>
                    <code className={codeStyles} >
                    asfddsaf
                    </code>
                </div>
            </div>
            <div className={sectionStyle}>
                <h2 className={titleStyle}>
                    Cisco
                </h2>
                <div className={itemStyle}>
                    <p className={paragraphStyle}>
                    Commandss
                    afdsdsa
                    </p>
                    <code className={codeStyles} >
                    asfddsaf
                    </code>
                </div>
            </div>
            
        </div>
    )
}