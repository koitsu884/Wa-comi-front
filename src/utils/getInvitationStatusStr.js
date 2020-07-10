const getInvitationStatusStr = status => {
    if (status === 'pending')
        return "承認待ち";
    if (status === 'declined')
        return "招待拒否";
    if (status === 'accepted')
        return "承認済み";
    return "不明";
}

export default getInvitationStatusStr;