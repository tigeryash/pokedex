import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const GenSelect = () => {
  return (
    
    <div className="flex flex-col items-center gap-1 md:gap-3 absolute -bottom-4 md:-bottom-10 
    -right-2 md:right-[8%] lg:bottom-26 lg:right-[4%] xl:right-[8%] xl:bottom-10 z-1 w-21">
        <Select defaultValue="Gen" >
            <SelectTrigger className="bg-background">
            <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={'gen'} value={'Gen'} className="hidden">
                Gen
                </SelectItem>
            {Array.from({ length: 9 }, (_, gen) => (
                <SelectItem key={gen} value={`Gen ${gen + 1}`}>
                {`Gen ${gen + 1}`}
                </SelectItem>
            ))}
            </SelectContent>
      </Select>
      </div>
  )
}

export default GenSelect