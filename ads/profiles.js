import axios from 'axios';

export const getGeneralProfile = async () => {
  let result = [];
  const options = {
    method: 'GET',
    url: 'http://local.adspower.net:50325/api/v1/user/list?page=1&page_size=10',
  };

  try {
    const { data } = await axios(options);
    result = data?.data?.list.map((el) => (el.name.includes('General') ? el.user_id : null)).filter((el) => el !== null);
  } catch (e) {
    console.log('ads: error in fetching profiles', e);
  }

  if (!result.length) {
    throw new Error('firstly create General profile in ADS');
  }

  return result[0];
};

export const updateProfileProxy = async (userId, options) => {
  const result = { success: true, message: null };
  try {
    const data = {
      user_id: userId,
      user_proxy_config: {
        proxy_soft: options.soft,
        proxy_type: options.type,
        proxy_host: options.host,
        proxy_port: options.port,
        proxy_user: options.user,
        proxy_password: options.password,
      },
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch('http://local.adspower.net:50325/api/v1/user/update', requestOptions);
    result.message = await response.json();
  } catch (error) {
    result.success = false;
    result.message = error;
  }

  return result;
};
