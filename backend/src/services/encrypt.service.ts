import * as bcrypt from 'bcrypt';

export const encrypt = async (data: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

export const compare = async (data: string, hash: string) => {
  return bcrypt.compare(data, hash);
};
