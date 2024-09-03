import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export function Signup()
{
    return <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
        <Auth type="Signup"></Auth>
        </div>
        <div className="hidden lg:block">
        <Quote></Quote>
        </div>
      </div>
    </div>
}