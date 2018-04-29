import React, {Component} from 'react';
import { Card, Grid, Button } from 'semantic-ui-react'
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';


class CampaignShow extends Component{

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approverscount: summary[3],
            manager: summary[4]
        };
    }

    renderCard() {

        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approverscount
        } = this.props;

        const item = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign and can create request to with draw money',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A requrst try to withdraw money from the contract',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: approverscount,
                meta: 'Number of Approvers',
                description: 'number of peoplehave donated already',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Balance (ether) ',
                description: 'Balance you have',
                style:{ overflowWrap: 'break-word' }
            }
        ];
        return < Card.Group items={item} />;
    }

    render () {
        return(
        <Layout>
            <h3>Compaign Show</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={9}>
                        {this.renderCard() }
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                    <Link route = {`/campaigns/${this.props.address}/requests`} >
                        <a>
                            <Button primary > View Requests </Button>
                        </a>
                    </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
        );
    }
}

export default CampaignShow;