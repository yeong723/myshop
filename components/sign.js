import { TextField, Fade } from "@mui/material";
import styles from "./sign.module.css";
import { useState } from "react";

export default function Sign() {
    const [idValue, setIdValue] = useState("");
    const [pwValue, setpwValue] = useState("");
    const [showPwField, setShowPwField] = useState(false);
    const [showPwCheckField, setshowPwCheckField] = useState(false);
    const [pwCheckValue, setPwCheckValue] = useState("");
    const [helpText, setHelpText] = useState("6-12자 이내 영문, 숫자 사용");
    const [pwCheck, setPwCheck] = useState("8-16자 이내 영문, 숫자, 특수문자 사용가능");

    const [falseV, setfalseV] = useState(true); // 에러 여부
    const [pwCheckHelpText, setpwCheckHelpText] = useState("");
    const [pwHelpText, setpwHelpText] = useState("");
    const [pwError, setpwError] = useState(false);
    const [pwCheckError, setpwCheckError] = useState(false);

    // 학번과 이름 텍스트 강조를 위한 상태
    const [highlightInfo, setHighlightInfo] = useState(false);

    const handleIdChange = (event) => {
        const value = event.target.value;
        setIdValue(value);

        const regexId = /^[a-zA-Z0-9]{6,12}$/;
        if (regexId.test(value)) {
            setHelpText("");
            setShowPwField(true);
            setfalseV(true);
        } else if (value.length > 5 && !regexId.test(value)) {
            setHelpText("ID를 다시입력하세요");
            setfalseV(false);
            setShowPwField(false);
        } else {
            setHelpText("6-12자 이내 영문, 숫자 사용");
            setShowPwField(false);
            setfalseV(true);
        }
    };

    const handlePwChange = (event) => {
        const value = event.target.value;
        setpwValue(value);
        const regexPw = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

        if (regexPw.test(value)) {
            setshowPwCheckField(true);
            setpwError(false);
            setpwHelpText("사용 가능한 PW 입니다.");
            setPwCheck("");
        } else {
            setshowPwCheckField(false);
            setpwError(true);
            setPwCheck("8-16자 이내 영문, 숫자, 특수문자 사용가능");
            setpwHelpText("8-16자 이내 영문, 숫자, 특수문자 사용가능");
        }
    };

    const handlePwCheckChange = (event) => {
        const value = event.target.value;
        setPwCheckValue(value);

        if (pwValue === value) {
            setpwCheckError(false);
            setpwCheckHelpText("");
            setHighlightInfo(true);  // 비밀번호가 맞으면 텍스트 강조
        } else {
            setpwCheckError(true);
            setpwCheckHelpText("비밀번호가 틀렸습니다.");
            setHighlightInfo(false);  // 비밀번호가 틀리면 텍스트 강조 해제
        }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <h2 className={styles.head}>회원가입</h2>
                <TextField
                    error={!falseV}
                    id="id-required"
                    label="ID"
                    placeholder="6-12자 이내 영문, 숫자"
                    helperText={helpText}
                    value={idValue}
                    onChange={handleIdChange}
                    style={{ width: "250px", marginBottom: "20px" }}
                    InputProps={{
                        style: { height: "54px" },
                    }}
                ></TextField>
                <TextField
                    id="password-required"
                    label="password"
                    type="password"
                    placeholder="password를 적으세요"
                    helperText={pwCheck}
                    style={{ width: "250px", marginBottom: "20px" }}
                    InputProps={{
                        style: { height: "54px" },
                    }}
                    value={pwValue}
                    onChange={handlePwChange}
                    fullWidth
                ></TextField>
                {showPwField && (
                    <Fade in={showPwCheckField} timeout={500}>
                        <TextField
                            error={pwCheckError}
                            id="password-required"
                            label="비밀번호 확인"
                            type="password"
                            placeholder="password를 적으세요"
                            helperText={pwCheckHelpText}
                            style={{ width: "250px" }}
                            InputProps={{
                                style: { height: "54px" },
                            }}
                            value={pwCheckValue}
                            onChange={handlePwCheckChange}
                            fullWidth
                        ></TextField>
                    </Fade>
                )}
                <div style={{ marginTop: "20px" }}>
                    <p className={highlightInfo ? styles.highlight : ""}>학번: 2519</p>
                    <p className={highlightInfo ? styles.highlight : ""}>이름: 허보영</p>
                </div>
            </div>
        </>
    );
}
