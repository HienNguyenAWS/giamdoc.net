/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import './style.scss'
import Highlighter from 'react-highlight-words'
import { useEffect } from 'react'
const FormatText3 = ({
    title = '',
    content,
    keySearch = 'bai',
    rowsLimit = 7,
    lengthInRow = 75
}) => {
    const [infoShow, setInfoShow] = useState({
        type: 'title',
        isShowAll: false,
        text: '',
        allowHidden: false
    })

    useEffect(() => {
        const tags = document.querySelectorAll('.content-format__3')
        for (const tag of tags) {
            const _tag = tag.getElementsByTagName('a')
            for (const __tag of _tag) {
                __tag.setAttribute('target', '_blank')
            }
        }
        const tagsContent = document.querySelectorAll('.content-format__3')
        for (const tagContent of tagsContent) {
            const tagP = tagContent.getElementsByTagName('p')
            if (tagP && tagP.length > 0) {
                for (const p of tagP) {
                    const text = p.innerHTML
                    if (
                        !(text.includes('<a') && text.includes('href="')) &&
            !text.includes('<img')
                    ) {
                        const links = Array.from(
                            text.matchAll(
                                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
                            ),
                            (l) => l[0]
                        )
                        if (links.length > 0) {
                            p.classList.add('js-changed-tag')
                            p.outerHTML = p.outerHTML.replace(/p/g, 'a')
                            const changedTag = document.querySelectorAll('.js-changed-tag')
                            for (const _changedTag of changedTag) {
                                _changedTag.setAttribute('href', text)
                            }
                        }
                    }
                }
            }
        }
    }, [content])

    useEffect(() => {
        let valTitle = findTextRender(title, lengthInRow, rowsLimit)
        if (valTitle.isShowAll) {
            let valContent = findTextRender(
                content,
                lengthInRow,
                rowsLimit - valTitle.rows
            )
            if (!valContent.isShowAll) {
                setInfoShow({
                    type: 'content',
                    isShowAll: false,
                    text: valContent.text,
                    allowHidden: true
                })
            }
        } else {
            setInfoShow({
                type: 'title',
                isShowAll: false,
                text: valTitle.text,
                allowHidden: true
            })
        }
    }, [title, content, rowsLimit, lengthInRow])

    const findTextRender = (text, lengthInRow, limitRow) => {
        let newText = ''
        let countRow = 0
        let isShowAll = true
        if (text && text.split('\n').length > 0) {
            for (let i in text.split('\n')) {
                if (
                    countRow +
            Math.ceil(text.split('\n')[i].split('').length / lengthInRow) <=
          limitRow
                ) {
                    countRow += Math.ceil(
                        text.split('\n')[i].split('').length / lengthInRow
                    )
                    newText += (i == 0 ? '' : '\n') + text.split('\n')[i]
                } else {
                    newText +=
            (i == 0 ? '' : '\n') +
            text
                .split('\n')
                [i].split('')
                .filter((e, idx) => idx <= (limitRow - countRow) * lengthInRow)
                .join('')
                    isShowAll = false
                    countRow += Math.ceil(
                        text.split('\n')[i].split('').length / lengthInRow
                    )
                    break
                }
            }
        }

        return {
            text: newText,
            isShowAll,
            rows: countRow
        }
    }

    const highlightText = (text) => {
        return `<span class="highlighted-text">${text}</span>`
    }

    const renderText = (text) => {
        if (text) {
            var _keySearch = decodeURI(keySearch)
            text = text.replace(_keySearch, highlightText(_keySearch))
            text = text.replace(
                _keySearch.toUpperCase(),
                highlightText(_keySearch.toUpperCase())
            )
            // text = text.replace(_keySearch.toLowerCase(), highlightText(_keySearch.toLowerCase()))
            text = text.replace(
                jsUcfirst(_keySearch),
                highlightText(jsUcfirst(_keySearch))
            )
            return <div dangerouslySetInnerHTML={{ __html: text }}></div>
        }
        return ''
    }

    function jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    if (!infoShow.allowHidden) {
        return (
            <>
                <div className="title-format__3">{renderText(title)}</div>
                <div className="content-format__3">{renderText(content)}</div>
            </>
        )
    }

    if (infoShow.type == 'title')
        return (
            <>
                <div className="title-format__3">
                    {renderText(infoShow.isShowAll ? title : infoShow.text)}
                    {!infoShow.isShowAll && (
                        <span
                            className="expand-all-text"
                            onClick={(e) => {
                                e.stopPropagation()
                                setInfoShow({ ...infoShow, isShowAll: true })
                            }}
                        >
                            <span className="dot-3">... </span>
              Xem thêm
                        </span>
                    )}
                </div>
                {infoShow.isShowAll && (
                    <div className="content-format__3">{renderText(content)}</div>
                )}
            </>
        )

    return (
        <>
            <div className="title-format__3">{renderText(title)}</div>
            <div
                className="content-format__3"
                style={content?.split('\n').length != 0 ? { margin: 0 } : {}}
            >
                {renderText(infoShow.isShowAll ? content : infoShow.text)}
                <span
                    className="expand-all-text"
                    onClick={(e) => {
                        e.stopPropagation()
                        setInfoShow({ ...infoShow, isShowAll: !infoShow.isShowAll })
                    }}
                >
                    <span className="dot-3">... </span>
                    {!infoShow.isShowAll ? 'Xem thêm' : 'Thu gọn'}
                </span>
            </div>
        </>
    )
}

export default FormatText3
