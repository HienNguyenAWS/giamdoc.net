/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import './style.scss'
import Highlighter from 'react-highlight-words'
const FormatText2 = ({ text, keySearch }) => {
    const [isShowAll, setIsShowAll] = useState(false)
    let isReadMore = false

    const renderText = (text) => {
        return (
            <>
                {text?.split(' ').map((r) => {
                    if (r.slice(0, 8) == 'https://' || r.slice(0, 7) == 'http://')
                        return (
                            <a
                                className={'access-link'}
                                target="_blank"
                                rel="noreferrer"
                                href={r}
                            >
                                <Highlighter
                                    highlightClassName="link-hightlight"
                                    searchWords={[keySearch]}
                                    autoEscape={true}
                                    textToHighlight={r + ' '}
                                />
                            </a>
                        )
                    return (
                        <>
                            {' '}
                            <Highlighter
                                highlightClassName="-hightlight"
                                searchWords={[keySearch]}
                                autoEscape={true}
                                textToHighlight={r + ' '}
                            />
                        </>
                    )
                })}
            </>
        )
    }

    return (
        <>
            {text?.split('\n').map((item, row) => {
                let paragraph = item.split(' ')
                // Tìm đoạn văn bản lớn hơn 50 từ để hiện ...Xem thêm
                if (
                    paragraph.length > 50 &&
          isReadMore === false &&
          isShowAll === false
                ) {
                    isReadMore = true
                    const lengthParagraph = row > 0 ? 20 : 45
                    let string = ''
                    let isAddReadMore = false
                    for (let i = 0; i < paragraph.length; i++) {
                        if (i < lengthParagraph) {
                            string += paragraph[i] + ' '
                        } else {
                            isAddReadMore = true
                            break
                        }
                    }
                    return (
                        <div
                            key={row}
                            style={{ wordBreak: 'break-word', minHeight: '21.6px' }}
                        >
                            {renderText(string)}
                            {isAddReadMore ? (
                                <span
                                    onClick={() => {
                                        setIsShowAll(true)
                                    }}
                                    style={{
                                        color: '#32A1C8',
                                        fontWeight: 700,
                                        cursor: 'pointer'
                                    }}
                                >
                  ...Xem thêm
                                </span>
                            ) : (
                                ''
                            )}
                        </div>
                    )
                }
                // Nếu cả đoạn 1 và 2 đều dưới 50 từ thì đoạn 3 sẽ hiện ...Xem thêm
                else if (isReadMore === false && row > 1 && isShowAll === false) {
                    isReadMore = true
                    return (
                        <span
                            onClick={() => {
                                setIsShowAll(true)
                            }}
                            style={{ color: '#32A1C8', fontWeight: 700, cursor: 'pointer' }}
                        >
              ...Xem thêm
                        </span>
                    )
                }
                // Hiển thị toàn bộ văn bản sau khi nhấn ...Xem thêm, chức năng 'Thu gọn' được để ở cuối văn bản
                else if (isShowAll === true) {
                    if (row === text.split('\n').length - 1) {
                        return (
                            <>
                                <div
                                    key={row}
                                    style={{ wordBreak: 'break-word', minHeight: '21.6px' }}
                                >
                                    {renderText(item)}
                                </div>
                                <div>
                                    <span
                                        onClick={() => {
                                            setIsShowAll(false)
                                        }}
                                        style={{
                                            color: '#32A1C8',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                        }}
                                    >
                    Thu gọn
                                    </span>
                                </div>
                            </>
                        )
                    } else {
                        return (
                            <div
                                key={row}
                                style={{ wordBreak: 'break-word', minHeight: '21.6px' }}
                            >
                                {renderText(item)}
                            </div>
                        )
                    }
                }
                // Đoạn văn bản ngắn không cần chức năng ...Xem thêm
                else if (isReadMore === false && isShowAll === false) {
                    return (
                        <div
                            key={row}
                            style={{ wordBreak: 'break-word', minHeight: '21.6px' }}
                        >
                            {renderText(item)}
                        </div>
                    )
                }
            })}
        </>
    )
}

export default FormatText2
