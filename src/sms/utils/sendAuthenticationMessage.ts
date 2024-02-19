export const sendAuthentinationMessage = (
  checkNumber: string,
  phoneNumber: string,
) => {
  return {
    type: 'SMS',
    contentType: 'COMM',
    countryCode: '82',
    from: '123',
    content: `인증번호는 [${checkNumber}] 입니다.`,
    messages: [
      {
        to: phoneNumber,
      },
    ],
  };
};
