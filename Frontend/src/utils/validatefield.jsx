const validate = (payload, setInValids) => {
  let invalidFieds = 0;
  let fields = Object.entries(payload);
  fields.forEach((item) => {
    if (item[1] === "") {
      setInValids((prev) => [
        ...prev,
        {
          name: item[0], msg: 'Bạn không thể bỏ qua ô này '
        }
      ])
      invalidFieds++
    }
  })
  fields.forEach((item) => {
    switch (item[0]) {
      case 'password':
        if (item[1].length < 6) {
          setInValids((prev) => [...prev, {
            name: item[0],
            msg: "Mật khẩu phải có 6 ký tự"
          }
          ]);
          invalidFieds++
        }
        break;
      case 'phone':
        if (!+item[1]) {
          setInValids((prev) => [...prev,
          {
            name: item[0],
            msg: "Số điện thoại không hợp lệ"
          }
          ])
          invalidFieds++
        }
        break;
      case 'areaNumber':
      case 'priceNumber':
        if (+item[1] === 0) {
          setInValids((prev) => [...prev, {
            name: item[0],
            msg: "Bạn chưa đặt giá trị cho ô này"
          }])
          invalidFieds++
        }
        if (!+item[1]) {
          setInValids((prev) => [...prev, {
            name: item[0],
            msg: "Ô này phải là số"
          }])
          invalidFieds++
        }
        break
      default:
        break;
    }
  })
  return invalidFieds
}
export default validate