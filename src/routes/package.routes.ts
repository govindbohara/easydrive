import { Router } from 'express';
import { createPackage, findAll, findOne } from '../controllers/package.controller';
import { authenticated } from '../middlewares/authenticated';

const packageRouter = Router();

packageRouter.get('/', authenticated, findAll);
packageRouter.post('/', authenticated, createPackage);
packageRouter.get('/:packageid', authenticated, findOne);
export default packageRouter;

/*
const [packages,setPackages] = useState([])
useEffect(() => {
async function fetchPackages(){
    const response = await fetch('http://localhost:4000/packages')
    const packages = await response.json()
    setPackages(packages)
}
fetchPackages()
},[])
*/
