import {AxisOptions, Chart} from 'react-charts'
import {useMemo} from "react";

type MyDatum = { date: Date, stars: number }

export function MyKek() {
    const data = [
        {
            label: 'React Charts',
            data: [
                {
                    date: new Date(),
                    stars: 23467238,
                },
            ],
        },
    ]

    const primaryAxis =  useMemo(
        (): AxisOptions<MyDatum> => ({
            getValue: datum => datum.date,
        }),
        []
    )

    const secondaryAxes =  useMemo(
        (): AxisOptions<MyDatum>[] => [
            {
                getValue: datum => datum.stars,
            },
        ],
        []
    )

    return (
        <Chart
            options={{
                data,
                primaryAxis,
                secondaryAxes,
            }}
        />
    )
}
