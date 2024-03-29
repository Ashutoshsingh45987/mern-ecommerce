import bcrypt from 'bcrypt';

export const hashPassword= async (password)=>{
    
    try {
        const saltround=10;
        const hashedPassword= await bcrypt.hash(password,saltround);
        // retkurn bhi krado
        return hashedPassword;
        
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword =async (password, hashedPassword)=>{
    try {
        return bcrypt.compare(password,hashedPassword);
    } catch (error) {
        console.log(error);
    }
}
