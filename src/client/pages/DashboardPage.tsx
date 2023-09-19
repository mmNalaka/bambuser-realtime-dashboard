import { AppLayout } from '../components/AppLayout'
import { DashboardMetricChangelog } from '../components/DashboardMetricChangelog'
import { DashboardMetrics } from '../components/DashboardMetrics'

export const DashboardPage = () => {

    return (
        <AppLayout>
            <DashboardMetrics />
            <DashboardMetricChangelog />
        </AppLayout>
    )
}
